// Core probability utilities (expand over time)

// Hypergeometric: probability of drawing exactly k successes
// Population size N, number of success states K, draws n, successes drawn k
export function hypergeometricPMF(k, N, K, n) {
  if (k < 0 || k > K || k > n) return 0;
  return combination(K, k) * combination(N - K, n - k) / combination(N, n);
}

// Cumulative: at least k successes
export function hypergeometricAtLeast(k, N, K, n) {
  let sum = 0;
  for (let i = k; i <= Math.min(K, n); i++) {
    sum += hypergeometricPMF(i, N, K, n);
  }
  return sum;
}

// Simple dice probability: exact total distribution for independent fair dice
export function diceSumDistribution(dice) {
  // dice: array of { faces: [..] } or numeric face count
  const start = new Map();
  start.set(0, 1);
  return dice.reduce((dist, d) => {
    const faces = Array.isArray(d.faces) ? d.faces : Array.from({length: d}, (_,i)=>i+1);
    const next = new Map();
    for (const [sum, ways] of dist.entries()) {
      for (const face of faces) {
        const s = sum + face;
        next.set(s, (next.get(s) || 0) + ways);
      }
    }
    return next;
  }, start);
}

export function normalizeDistribution(map) {
  let total = 0;
  for (const v of map.values()) total += v;
  const out = [];
  for (const [k,v] of map.entries()) {
    out.push({ value: k, probability: v / total });
  }
  return out.sort((a,b)=>a.value-b.value);
}

// Helpers
export function combination(n,k){
  if (k<0 || k>n) return 0;
  if (k===0 || k===n) return 1;
  k = Math.min(k, n-k);
  let num = 1, den = 1;
  for (let i=1;i<=k;i++){
    num *= (n - (k - i));
    den *= i;
  }
  return num/den;
}