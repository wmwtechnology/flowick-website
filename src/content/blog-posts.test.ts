import { describe, it, expect } from 'vitest';
import { findPostBySlug, blogPosts } from './blog-posts';

describe('blog-posts', () => {
  it('findPostBySlug returns post for valid slug', () => {
    const post = findPostBySlug('dijital-donusum');
    expect(post).toBeDefined();
    expect(post?.slug).toBe('dijital-donusum');
  });

  it('findPostBySlug returns undefined for unknown slug', () => {
    const post = findPostBySlug('bilinmeyen-yazi');
    expect(post).toBeUndefined();
  });

  it('all posts have required fields', () => {
    for (const post of blogPosts) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.image).toBeTruthy();
      expect(post.htmlBody).toBeTruthy();
    }
  });
});
