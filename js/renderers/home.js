import { searchGames } from '../data/dataLoader.js';

export async function renderHome() {
  try {
    const recent = await searchGames('');
    console.log('Games loaded:', recent); // Add this for debugging
    const featured = recent.slice(0, 6);
    return `
      <section>
        <h2>Discover Probability Tools</h2>
        <p>Search for a game and explore card draw and dice probabilities. Add missing games via a pull request.</p>
        <div class="inline-form">
          <input id="home-search-input" type="text" placeholder="Search games..." />
          <button id="home-search-btn">Search</button>
        </div>
        <div id="home-search-results"></div>
      </section>

      <section class="section">
        <h3>Recently Added</h3>
        <div class="card-grid">
          ${featured.length > 0 ? featured.map(g => gameCard(g)).join('') : '<p>No games loaded. Check console for errors.</p>'}
        </div>
      </section>
    `;
  } catch (error) {
    console.error('Error loading games:', error);
    return `
      <section>
        <h2>Discover Probability Tools</h2>
        <p class="error">Error loading games: ${error.message}</p>
      </section>
    `;
  }
}

function gameCard(g) {
  return `<div class="card">
    <h3><a href="#/game/${g.slug}">${g.name}</a></h3>
    <div class="muted">${(g.tags || []).map(t=>`<span class="badge">${t}</span>`).join(' ')}</div>
    <p class="muted">Schema ${g.schemaVersion || 'n/a'}</p>
  </div>`;
}

document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'home-search-btn') {
    const input = document.getElementById('home-search-input');
    const val = input.value.trim();
    window.location.hash = '#/games?q=' + encodeURIComponent(val);
  }
});