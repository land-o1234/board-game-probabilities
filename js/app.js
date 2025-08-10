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

router.start();