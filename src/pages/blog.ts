import { blogPosts } from '../content/blog-posts';
import { navigate, getContainer } from '../router';

export function renderBlog(_params: Record<string, string>): void {
  const container = getContainer();
  container.innerHTML = blogHTML();
  initBlogSearch();
  initBlogCardClicks();
}

function blogHTML(): string {
  const cards = blogPosts
    .map(
      (post) => `
    <div class="blog-card" data-slug="${post.slug}" data-search="${post.searchText}" style="background-image:url('${post.image}')">
      <div class="blog-card-overlay"></div>
      <div class="blog-card-body">
        <h2 class="blog-card-title">${post.title}</h2>
        <p class="blog-card-desc">${post.subtitle}</p>
      </div>
      <div class="blog-card-footer">
        <div class="blog-stat"><i class="fa fa-heart-o"></i><span>${post.likes}</span></div>
        <div class="blog-stat"><i class="fa fa-eye"></i><span>${post.views}</span></div>
      </div>
    </div>
  `
    )
    .join('');

  return `
    <div class="blog-page">
      <div class="blog-header">
        <h1>Blog</h1>
        <div class="blog-search-wrap">
          <i class="fa fa-search"></i>
          <input type="text" id="blog-search" placeholder="Blog yazılarında ara...">
        </div>
      </div>
      <div class="blog-grid">
        ${cards}
        <p class="blog-no-results" id="blog-no-results" style="display:none;">Aramanızla eşleşen yazı bulunamadı.</p>
      </div>
    </div>
  `;
}

function initBlogSearch(): void {
  const input = document.getElementById('blog-search') as HTMLInputElement | null;
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    const cards = document.querySelectorAll<HTMLElement>('.blog-card');
    const noResults = document.getElementById('blog-no-results');
    let visible = 0;

    cards.forEach((card) => {
      const text = (card.dataset.search ?? '').toLowerCase();
      const match = !q || text.includes(q);
      card.classList.toggle('hidden', !match);
      if (match) visible++;
    });

    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
  });
}

function initBlogCardClicks(): void {
  document.querySelectorAll<HTMLElement>('.blog-card[data-slug]').forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const slug = card.dataset.slug;
      if (slug) navigate(`/blog/${slug}`);
    });
  });
}
