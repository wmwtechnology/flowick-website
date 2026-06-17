import './styles.css';
import { initRouter, addRoute } from './router';
import { initHeader, updateActiveNav } from './header';
import { initPolicyModals } from './shared/modals';
import { renderHome } from './pages/home';
import { renderBlog } from './pages/blog';
import { renderBlogDetail } from './pages/blog-detail';
import { renderProducts } from './pages/products';

function wrapWithNav(renderer: (params: Record<string, string>) => void, path: string) {
  return (params: Record<string, string>) => {
    renderer(params);
    updateActiveNav(path);
  };
}

const app = document.getElementById('app');
if (!app) throw new Error('#app elementi bulunamadı');

addRoute('/', wrapWithNav(renderHome, '/'));
addRoute('/urunler', wrapWithNav(renderProducts, '/urunler'));
addRoute('/blog', wrapWithNav(renderBlog, '/blog'));
addRoute('/blog/:slug', wrapWithNav(renderBlogDetail, '/blog'));

initHeader();
initPolicyModals();
initRouter(app);
