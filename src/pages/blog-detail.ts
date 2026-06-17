import { findPostBySlug } from '../content/blog-posts';
import { navigate, getContainer } from '../router';

export function renderBlogDetail(params: Record<string, string>): void {
  const container = getContainer();
  const slug = params['slug'] ?? '';
  const post = findPostBySlug(slug);

  if (!post) {
    navigate('/blog');
    return;
  }

  container.innerHTML = `
    <div class="blog-detail-page">
      <div class="blog-detail-hero">
        <img src="${post.heroImage}" alt="${post.title}">
      </div>

      <div class="blog-detail-meta-bar">
        <div class="blog-detail-stats">
          <div class="blog-detail-stat"><i class="fa fa-heart"></i><span>${post.likes}</span></div>
          <div class="blog-detail-stat"><i class="fa fa-eye"></i><span>${post.views}</span></div>
        </div>
        <div class="blog-detail-info">
          <span>Yayınlanma Tarihi: ${post.date}</span>
          <span>Yazar: ${post.author}</span>
        </div>
      </div>

      <div class="blog-detail-wrap">
        <a class="blog-detail-back" data-link="/blog" style="cursor:pointer;">
          <i class="fa fa-chevron-left"></i> Blog'a Dön
        </a>
        <h1 class="blog-detail-title">${post.title}</h1>
        <h2 class="blog-detail-subtitle">${post.subtitle}</h2>
        <div class="blog-detail-body">${post.htmlBody}</div>
      </div>
    </div>
  `;
}
