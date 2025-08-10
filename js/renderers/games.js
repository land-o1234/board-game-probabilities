import { searchGames } from '../data/dataLoader.js';

export async function renderGames() {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const q = params.get('q') || '';
  const results = await searchGames(q);
  return `
    <h2>Games</h2>
    <div class="inline-form">
      <input id="games-search-input" type="text" placeholder="Search..." value="${escapeHtml(q)}" />
      <button id="games-search-btn">Search</button>
      <button class="secondary" id="games-clear-btn">Clear</button>
    </div>
    <p class="muted">${results.length} result(s)</p>
    <div class="card-grid">
      ${results.map(g => `<div class="card">
          <h3><a href="#/game/${g.slug}">${g.name}</a></h3>
          <div class="muted">${(g.tags||[]).map(t=>`<span class="badge">${t}</span>`).join(' ')}</div>
          <p class="muted">${g.shortDescription || ''}</p>
        </div>`).join('') || '<p>No matches.</p>'}
    </div>
  `;
}

function escapeHtml(str){
  return str.replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

document.addEventListener('click', (e) => {
  if (e.target?.id === 'games-search-btn') {
    const val = document.getElementById('games-search-input').value.trim();
    window.location.hash = '#/games?q=' + encodeURIComponent(val);
  } else if (e.target?.id === 'games-clear-btn') {
    window.location.hash = '#/games';
  }
});