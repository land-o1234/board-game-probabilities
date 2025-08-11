import { Router } from './router.js';
import { renderHome } from './renderers/home.js';
import { renderGames } from './renderers/games.js';
import { renderGameDetail } from './renderers/gameDetail.js';
import { renderAbout } from './renderers/about.js';
import { renderContribute } from './renderers/contribute.js';
import { renderAddGame, initializeAddGameForm } from './renderers/addGame.js';

const router = new Router({
  '/': renderHome,
  '/games': renderGames,
  '/game/:slug': renderGameDetail,
  '/about': renderAbout,
  '/contribute': renderContribute,
  '/add-game': () => {
    const html = renderAddGame();
    // Initialize the form after the HTML is added to DOM
    setTimeout(initializeAddGameForm, 0);
    return html;
  }
});

router.start();