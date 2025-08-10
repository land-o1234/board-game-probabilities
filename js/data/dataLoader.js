// Data loading abstraction. Right now: static local JSON files in gameData/.
// Future-ready: add remote fetchers (e.g., BGG API) by extending DataSources.

const cache = new Map();

export async function listGameFiles() {
  // Static manifest build: Option 1 – maintain a manifest.json that lists game slugs.
  // For initial simplicity we scan a static manifest file.
  if (!cache.has('__manifest__')) {
    const res = await fetch('gameData/manifest.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load manifest.json');
    const manifest = await res.json();
    cache.set('__manifest__', manifest);
  }
  return cache.get('__manifest__');
}

export async function loadGame(slug) {
  if (cache.has(slug)) return cache.get(slug);
  const res = await fetch(`gameData/${slug}.json`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Game file not found: ${slug}`);
  const data = await res.json();
  cache.set(slug, data);
  return data;
}

// Search index creation (simple).
export async function searchGames(query) {
  const q = query.trim().toLowerCase();
  const manifest = await listGameFiles();
  if (!q) return manifest.games;
  return manifest.games.filter(g =>
    g.name.toLowerCase().includes(q) ||
    (g.tags || []).some(t => t.toLowerCase().includes(q)) ||
    (g.slug.toLowerCase().includes(q))
  );
}