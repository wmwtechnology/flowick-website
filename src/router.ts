type PageRenderer = (params: Record<string, string>) => void;

interface Route {
  pattern: string;
  render: PageRenderer;
}

const routes: Route[] = [];
let appContainer: HTMLElement;

export function matchRoute(pattern: string, path: string): Record<string, string> | null {
  const patternParts = pattern.split('/');
  const pathParts = path.split('/');

  if (patternParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    const p = patternParts[i];
    const v = pathParts[i];
    if (p !== undefined && p.startsWith(':')) {
      params[p.slice(1)] = v ?? '';
    } else if (p !== v) {
      return null;
    }
  }
  return params;
}

export function addRoute(pattern: string, render: PageRenderer): void {
  routes.push({ pattern, render });
}

export function navigate(path: string): void {
  history.pushState(null, '', path);
  dispatch();
}

export function initRouter(container: HTMLElement): void {
  appContainer = container;
  window.addEventListener('popstate', dispatch);
  document.addEventListener('click', interceptLinks);
  dispatch();
}

function dispatch(): void {
  const path = window.location.pathname;
  for (const route of routes) {
    const params = matchRoute(route.pattern, path);
    if (params !== null) {
      route.render(params);
      window.scrollTo(0, 0);
      return;
    }
  }
  navigate('/');
}

function interceptLinks(e: MouseEvent): void {
  const el = (e.target as Element).closest('[data-link]');
  if (!el) return;
  e.preventDefault();
  const href = el.getAttribute('data-link') ?? '/';
  navigate(href);
}

export function getContainer(): HTMLElement {
  return appContainer;
}
