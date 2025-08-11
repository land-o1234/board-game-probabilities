import { Router } from './router.js';
import { renderHome } from './renderers/home.js';
import { renderGames } from './renderers/games.js';
import { renderGameDetail } from './renderers/gameDetail.js';
import { renderAbout } from './renderers/about.js';
import { renderContribute } from './renderers/contribute.js';

const router = new Router({
  '/': renderHome,
  '/games': renderGames,
  '/game/:slug': renderGameDetail,
  '/about': renderAbout,
  '/contribute': renderContribute
});

// Theme management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  
  function setTheme(theme) {
    if (theme === 'light') {
      root.classList.add('light-theme');
      themeToggle.textContent = '☀️';
    } else {
      root.classList.remove('light-theme');
      themeToggle.textContent = '🌙';
    }
    localStorage.setItem('theme', theme);
  }
  
  setTheme(savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}

router.start();
initTheme();