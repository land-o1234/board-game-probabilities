export class Router {
  constructor(routes) {
    this.routes = routes;
    this.rootEl = document.getElementById('app-root');
    window.addEventListener('hashchange', () => this.handle());
  }
  start() { this.handle(); }
  parseHash() {
    const hash = window.location.hash.replace(/^#/, '') || '/';
    return hash;
  }
  matchRoute(path) {
    for (const pattern in this.routes) {
      const paramNames = [];
      // transform /game/:slug => regex
      const regex = new RegExp('^' + pattern.replace(/:[^/]+/g, (m) => {
        paramNames.push(m.slice(1));
        return '([^/]+)';
      }) + '$');
      const match = path.match(regex);
      if (match) {
        const params = {};
        paramNames.forEach((n,i)=> params[n]=decodeURIComponent(match[i+1]));
        return { handler: this.routes[pattern], params };
      }
    }
    return null;
  }
  async handle() {
    const path = this.parseHash();
    const match = this.matchRoute(path);
    if (!match) {
      this.rootEl.innerHTML = `<h2>Not Found</h2><p>No route for <code>${path}</code></p>`;
      return;
    }
    try {
      const html = await match.handler(match.params);
      if (typeof html === 'string') {
        this.rootEl.innerHTML = html;
      } else if (html instanceof Node) {
        this.rootEl.innerHTML = '';
        this.rootEl.appendChild(html);
      }
    } catch (e) {
      console.error(e);
      this.rootEl.innerHTML = `<p class="error">Error rendering route.</p>`;
    }
  }
}