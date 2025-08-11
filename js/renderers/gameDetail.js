import { loadGame } from '../data/dataLoader.js';
import { hypergeometricAtLeast } from '../utils/probability.js';
import { diceSumDistribution, normalizeDistribution } from '../utils/probability.js';

export async function renderGameDetail({ slug }) {
  try {
    const game = await loadGame(slug);
    return gameDetailHTML(game, slug);
  } catch (e) {
    return `<h2>Game Not Found</h2><p class="error">${e.message}</p>`;
  }
}

function gameDetailHTML(game, slug) {
  return `
    <h2>${game.name}</h2>
    <p>${game.description || ''}</p>
    <div class="muted">
      ${(game.tags || []).map(t=>`<span class="badge">${t}</span>`).join(' ')}
      ${game.bgg_id ? `<a class="badge" target="_blank" rel="noopener" href="https://boardgamegeek.com/boardgame/${game.bgg_id}">BGG</a>` : ''}
    </div>
    ${cardsSection(game)}
    ${diceSection(game)}
    <div class="section">
      <h3>Metadata</h3>
      <p><strong>Schema Version:</strong> ${game.schemaVersion || 'n/a'} | <strong>Slug:</strong> ${slug}</p>
      <p class="muted">Contribute improvements on GitHub.</p>
    </div>
  `;
}

function cardsSection(game) {
  if (!game.components?.cards?.length) return '';
  const decks = game.components.cards;
  return `
    <div class="section">
      <h3>Card Decks</h3>
      ${decks.map((d,i)=>deckBlock(d,i)).join('')}
    </div>
  `;
}

function deckBlock(deck, idx) {
  const symbolRows = (deck.symbols||[]).map(s=>`
    <tr>
      <td>${s.name}</td>
      <td>${s.count}</td>
      <td>
        <form class="inline-form calc-form" data-deck="${idx}" data-symbol="${encodeURIComponent(s.name)}">
          <input type="number" name="draws" min="1" max="${deck.total_cards}" placeholder="Draws" required />
          <input type="number" name="atLeast" min="1" max="${s.count}" placeholder="At least" required />
          <button type="submit">Calc</button>
        </form>
        <div class="calc-result" id="result-${idx}-${encodeURIComponent(s.name)}"></div>
      </td>
    </tr>`).join('');
  return `
    <div class="deck-block">
      <h4>${deck.deck_name || 'Deck '+(idx+1)}</h4>
      <table class="table-like">
        <thead>
          <tr><th>Symbol</th><th>Count</th><th>Probability Tool</th></tr>
        </thead>
        <tbody>${symbolRows}</tbody>
      </table>
    </div>
  `;
}

function diceSection(game) {
  if (!game.components?.dice?.length) return '';
  return `
    <div class="section">
      <h3>Dice</h3>
      ${game.components.dice.map((d,i)=>diceBlock(d,i)).join('')}
    </div>
  `;
}

function diceBlock(diceSet, idx) {
  const desc = diceSet.description || '';
  const dieMeta = Array.isArray(diceSet.dice) ? diceSet.dice : [];
  return `
    <div class="dice-block">
      <h4>${diceSet.name || 'Dice Set '+(idx+1)}</h4>
      <p class="muted">${desc}</p>
      <button class="secondary" data-dice-dist="${idx}">Show Sum Distribution</button>
      <div class="dice-dist-output" id="dice-dist-${idx}"></div>
    </div>
  `;
}

// Event delegation for forms & dice distribution
document.addEventListener('submit', (e) => {
  const form = e.target;
  if (form.classList.contains('calc-form')) {
    e.preventDefault();
    const draws = parseInt(form.draws.value,10);
    const atLeast = parseInt(form.atLeast.value,10);
    const deckIndex = parseInt(form.dataset.deck,10);
    const symbol = decodeURIComponent(form.dataset.symbol);
    runCardCalc(deckIndex, symbol, draws, atLeast);
  }
});

async function runCardCalc(deckIndex, symbolName, draws, atLeast) {
  // Need currently loaded game slug from location:
  const slug = window.location.hash.replace('#/game/', '');
  const { loadGame } = await import('../data/dataLoader.js');
  const game = await loadGame(slug);
  const deck = game.components.cards[deckIndex];
  const symbol = deck.symbols.find(s => s.name === symbolName);
  if (!symbol) return;
  const resultDiv = document.getElementById(`result-${deckIndex}-${encodeURIComponent(symbol.name)}`);
  const N = deck.total_cards;
  const K = symbol.count;
  const n = draws;
  const k = atLeast;
  if (n > N || k > K) {
    resultDiv.innerHTML = `<span class="error">Invalid parameters.</span>`;
    return;
  }
  const p = hypergeometricAtLeast(k, N, K, n);
  resultDiv.innerHTML = `<code>P(X ≥ ${k}) = ${(p*100).toFixed(3)}%</code>`;
}

document.addEventListener('click', async (e) => {
  const btn = e.target;
  if (btn.dataset.diceDist !== undefined) {
    const idx = parseInt(btn.dataset.diceDist,10);
    const slug = window.location.hash.replace('#/game/', '');
    const { loadGame } = await import('../data/dataLoader.js');
    const game = await loadGame(slug);
    const diceSet = game.components.dice[idx];
    const diceArray = diceSet.dice || [];
    const distMap = diceSumDistribution(diceArray.map(d => ({
      faces: Array.isArray(d.faces) ? d.faces : Array.from({ length: d.faces || 6 }, (_,i)=>i+1)
    })));
    const dist = normalizeDistribution(distMap);
    const container = document.getElementById(`dice-dist-${idx}`);
    container.innerHTML = `
      <table class="table-like">
        <thead><tr><th>Sum</th><th>Probability</th></tr></thead>
        <tbody>
          ${dist.map(r=>`<tr><td>${r.value}</td><td>${(r.probability*100).toFixed(3)}%</td></tr>`).join('')}
        </tbody>
      </table>
    `;
  }
});