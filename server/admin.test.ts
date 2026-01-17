import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AdminUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AdminUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  const user: AdminUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Admin Panel - Blog Management", () => {
  it("should allow admin to create a blog post", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const uniqueSlug = `test-blog-post-${Date.now()}`;

    const result = await caller.blog.create({
      title: "Test Blog Post",
      slug: uniqueSlug,
      excerpt: "This is a test excerpt",
      content: "This is the full content of the blog post",
      author: "Test Author",
      image: "https://example.com/image.jpg",
      readTime: "5 min read",
      featured: 0,
      published: 1,
    });

    expect(result).toEqual({ success: true });
  });

  it("should deny non-admin users from creating blog posts", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.blog.create({
        title: "Test Blog Post",
        slug: "test-blog-post",
        excerpt: "This is a test excerpt",
        content: "This is the full content of the blog post",
        author: "Test Author",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Unauthorized");
    }
  });

  it("should allow admin to list blog posts", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.blog.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should allow filtering blog posts by published status", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const publishedPosts = await caller.blog.list({ published: true });
    expect(Array.isArray(publishedPosts)).toBe(true);
  });
});

describe("Admin Panel - Form Submissions", () => {
  it("should allow public users to submit forms", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    });

    const result = await caller.forms.submit({
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      service: "Hair Styling",
      preferredDate: "2026-02-01",
      preferredTime: "10:00 AM",
      notes: "Looking for a haircut",
    });

    expect(result).toEqual({ success: true });
  });

  it("should allow admin to view form submissions", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.forms.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should deny non-admin users from viewing form submissions", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.forms.list();
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Unauthorized");
    }
  });

  it("should allow admin to update form submission status", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.forms.updateStatus({
      id: 1,
      status: "contacted",
    });

    expect(result).toEqual({ success: true });
  });

  it("should deny non-admin users from updating form status", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.forms.updateStatus({
        id: 1,
        status: "contacted",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Unauthorized");
    }
  });
});

describe("Admin Panel - Analytics", () => {
  it("should allow admin to view analytics dashboard", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.analytics.dashboard();
    expect(result).toBeDefined();
    expect(result).toHaveProperty("totalViews");
    expect(result).toHaveProperty("uniquePages");
    expect(result).toHaveProperty("topPages");
  });

  it("should deny non-admin users from viewing analytics", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.analytics.dashboard();
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Unauthorized");
    }
  });

  it("should allow public users to track page views", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    });

    const result = await caller.analytics.trackView({
      page: "/services",
      referrer: "https://google.com",
      userAgent: "Mozilla/5.0",
      ipHash: "hash123",
    });

    expect(result).toEqual({ success: true });
  });
});
