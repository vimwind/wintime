import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { 
  getBlogPosts, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost,
  getFormSubmissions,
  createFormSubmission,
  updateFormSubmissionStatus,
  getAnalytics,
  trackPageView
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Blog management routers
  blog: router({
    list: publicProcedure
      .input(z.object({ published: z.boolean().optional() }).optional())
      .query(async ({ input }) => {
        return await getBlogPosts(input?.published);
      }),
    
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.string().min(1),
        author: z.string().min(1),
        image: z.string().optional(),
        readTime: z.string().optional(),
        metaDescription: z.string().max(160).optional(),
        keywords: z.string().optional(),
        featured: z.number().optional(),
        published: z.number().optional(),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized: Admin access required');
        }
        await createBlogPost(input);
        return { success: true };
      }),
    
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        author: z.string().optional(),
        image: z.string().optional(),
        readTime: z.string().optional(),
        metaDescription: z.string().max(160).optional(),
        keywords: z.string().optional(),
        featured: z.number().optional(),
        published: z.number().optional(),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized: Admin access required');
        }
        const { id, ...data } = input;
        console.log(`[Router] Blog update request for post ${id}`);
        await updateBlogPost(id, data);
        console.log(`[Router] Blog update completed for post ${id}`);
        return { success: true };
      }),
    
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized: Admin access required');
        }
        await deleteBlogPost(input.id);
        return { success: true };
      }),
  }),

  // Form submissions routers
  forms: router({
    list: protectedProcedure
      .input(z.object({ status: z.string().optional() }).optional())
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized: Admin access required');
        }
        return await getFormSubmissions(input?.status);
      }),
    
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        service: z.string().optional(),
        preferredDate: z.string().optional(),
        preferredTime: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await createFormSubmission({
          ...input,
          status: 'new',
        });
        return { success: true };
      }),
    
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['new', 'contacted', 'confirmed', 'completed', 'cancelled']),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized: Admin access required');
        }
        await updateFormSubmissionStatus(input.id, input.status);
        return { success: true };
      }),
  }),

  // Analytics routers
  analytics: router({
    dashboard: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized: Admin access required');
        }
        return await getAnalytics();
      }),
    
    trackView: publicProcedure
      .input(z.object({
        page: z.string(),
        referrer: z.string().optional(),
        userAgent: z.string().optional(),
        ipHash: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await trackPageView(input.page, input.referrer, input.userAgent, input.ipHash);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
