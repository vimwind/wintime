import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

import { blogPosts, formSubmissions, pageViews, InsertBlogPost, InsertFormSubmission, InsertPageView, BlogPost, FormSubmission } from "../drizzle/schema";
import { desc } from "drizzle-orm";

/**
 * Blog Posts Queries
 */
export async function getBlogPosts(published?: boolean) {
  const db = await getDb();
  if (!db) return [];

  if (published !== undefined) {
    return await db.select().from(blogPosts).where(eq(blogPosts.published, published ? 1 : 0));
  }
  return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBlogPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(blogPosts).values(post);
}

export async function updateBlogPost(id: number, post: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(blogPosts).set({
    ...post,
    updatedAt: new Date(),
  }).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

/**
 * Form Submissions Queries
 */
export async function getFormSubmissions(status?: string) {
  const db = await getDb();
  if (!db) return [];
  if (status) {
    return await db.select().from(formSubmissions).where(eq(formSubmissions.status, status as any));
  }
  return await db.select().from(formSubmissions).orderBy(desc(formSubmissions.createdAt));
}

export async function createFormSubmission(submission: InsertFormSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(formSubmissions).values(submission);
}

export async function updateFormSubmissionStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(formSubmissions).set({ status: status as any }).where(eq(formSubmissions.id, id));
}

/**
 * Analytics Queries
 */
export async function trackPageView(page: string, referrer?: string, userAgent?: string, ipHash?: string) {
  const db = await getDb();
  if (!db) return;
  await db.insert(pageViews).values({ page, referrer, userAgent, ipHash });
}

export async function getAnalytics(days: number = 30) {
  const db = await getDb();
  if (!db) return { totalViews: 0, uniquePages: 0, topPages: [] };
  
  const result = await db.select().from(pageViews);
  const totalViews = result.length;
  const uniquePages = new Set(result.map(v => v.page)).size;
  const topPages = Object.entries(
    result.reduce((acc: Record<string, number>, v) => {
      acc[v.page] = (acc[v.page] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return { totalViews, uniquePages, topPages };
}
