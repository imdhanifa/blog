import type { Post } from "../types/post";

// ✅ lazy load when needed
const { mockPosts } = await import("../data/mockPosts");


/** Get all posts */
export async function getPosts(): Promise<Post[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPosts), 300);
  });
}

/** Get single post by id */
export async function getPostById(id: string): Promise<Post | null> {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(mockPosts.find((p) => p.id === id) || null),
      300
    );
  });
}

/** Create new post */
export async function createPost(newPost: Omit<Post, "id" | "createdAt">): Promise<Post> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEntry: Post = {
        ...newPost,
        id: (mockPosts.length + 1).toString(),
        createdAt: new Date().toISOString(),
      };
      mockPosts.unshift(newEntry); // add to top
      resolve(newEntry);
    }, 300);
  });
}

/** Update post */
export async function updatePost(updated: Post): Promise<Post | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockPosts.findIndex((p) => p.id === updated.id);
      if (index !== -1) {
        mockPosts[index] = { ...mockPosts[index], ...updated };
        resolve(mockPosts[index]);
      } else {
        resolve(null);
      }
    }, 300);
  });
}

/** Delete post */
export async function deletePost(id: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockPosts.findIndex((p) => p.id === id);
      if (index !== -1) {
        mockPosts.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 300);
  });
}