export function renderAbout() {
  return `
    <div class="section">
      <h2>🎲 About Board Game Probabilities</h2>
      <p>This application provides interactive probability calculators for board game components, helping players make informed decisions and understand the mathematical foundations of their favorite games.</p>
    </div>
    
    <div class="section">
      <h3>🎯 What We Calculate</h3>
      <div class="card-grid">
        <div class="card">
          <h4>🃏 Card Draw Probabilities</h4>
          <p>Calculate the chance of drawing specific symbols or card types using hypergeometric distribution.</p>
          <p class="muted">Perfect for deck-building games, card drafting, and resource management.</p>
        </div>
        <div class="card">
          <h4>🎲 Dice Distributions</h4>
          <p>Analyze probability distributions for standard and custom dice combinations.</p>
          <p class="muted">Supports numeric dice, custom faces, and complex multi-die scenarios.</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h3>🏗️ How It Works</h3>
      <p>All game data comes from community-contributed JSON files with a standardized schema. This modular approach ensures:</p>
      <ul>
        <li><strong>Accuracy</strong>: Data is reviewed by the community and game experts</li>
        <li><strong>Extensibility</strong>: Easy to add new games and probability types</li>
        <li><strong>Future-proofing</strong>: Designed to integrate with external APIs like BoardGameGeek</li>
        <li><strong>Transparency</strong>: All calculations and data are open source</li>
      </ul>
    </div>

    <div class="section">
      <h3>🤝 Community-Driven</h3>
      <p>This project thrives on community contributions. Whether you're a game designer, mathematician, or enthusiastic player, there are many ways to help improve the accuracy and coverage of board game probability data.</p>
      <p><a href="#/contribute">Learn how to contribute →</a></p>
    </div>

    <div class="section">
      <h3>🔬 Mathematical Foundation</h3>
      <p>Our calculations use well-established statistical methods:</p>
      <ul>
        <li><strong>Hypergeometric Distribution</strong>: For card drawing without replacement</li>
        <li><strong>Convolution</strong>: For independent dice combinations</li>
        <li><strong>Exact Calculations</strong>: No approximations - precise mathematical results</li>
      </ul>
    </div>
  `;
}