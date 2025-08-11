export function renderContribute() {
  return `
    <div class="contribute-hero">
      <h2>🎮 Help Us Grow!</h2>
      <p class="hero-text">Love board games? Help fellow players by adding probability data for your favorite games!</p>
    </div>
    
    <div class="contribute-section">
      <h3>🚀 Easy Ways to Contribute</h3>
      <div class="card-grid">
        <div class="card">
          <h4>📊 Add Game Data</h4>
          <p>Submit card probabilities and dice information for games you know well.</p>
          <p class="muted">Perfect for: Game designers, frequent players, math enthusiasts</p>
        </div>
        <div class="card">
          <h4>🐛 Report Issues</h4>
          <p>Found incorrect probabilities or missing features? Let us know!</p>
          <p class="muted">Perfect for: Anyone who spots problems</p>
        </div>
        <div class="card">
          <h4>💡 Suggest Features</h4>
          <p>Ideas for new probability tools or better user experience?</p>
          <p class="muted">Perfect for: UI/UX enthusiasts, feature requesters</p>
        </div>
      </div>
    </div>

    <div class="contribute-section">
      <h3>📝 Step-by-Step Guide</h3>
      <div class="steps-container">
        <div class="step">
          <span class="step-number">1</span>
          <div class="step-content">
            <h4>Fork the Repository</h4>
            <p>Click "Fork" on the GitHub repository to create your own copy.</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <div class="step-content">
            <h4>Create Game Data File</h4>
            <p>Add a new file: <code>gameData/your-game-name.json</code></p>
            <p class="muted">Include card decks, dice, and probability information.</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <div class="step-content">
            <h4>Update the Manifest</h4>
            <p>Add your game entry to <code>gameData/manifest.json</code></p>
            <p class="muted">This makes your game discoverable in the app.</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">4</span>
          <div class="step-content">
            <h4>Submit Pull Request</h4>
            <p>Open a pull request with a clear description of what you added.</p>
            <p class="muted">We'll review and help improve your contribution!</p>
          </div>
        </div>
      </div>
    </div>

    <div class="contribute-section">
      <h3>📚 Resources</h3>
      <div class="resources-grid">
        <a href="gameData/schema.json" class="resource-link" target="_blank">
          <strong>📖 Schema Documentation</strong>
          <p>Learn the JSON structure for game data</p>
        </a>
        <a href="#/games" class="resource-link">
          <strong>🎯 Example Games</strong>
          <p>See how existing games are structured</p>
        </a>
        <a href="CONTRIBUTING.md" class="resource-link" target="_blank">
          <strong>🤝 Contributing Guidelines</strong>
          <p>Best practices and code of conduct</p>
        </a>
      </div>
    </div>

    <div class="contribute-section">
      <h3>❓ Need Help?</h3>
      <p>Don't worry if you're new to this! The community is friendly and helpful.</p>
      <ul class="help-list">
        <li>🎮 <strong>Not sure about probabilities?</strong> Start with simple card counting</li>
        <li>💻 <strong>New to GitHub?</strong> Check out GitHub's guides for beginners</li>
        <li>🤔 <strong>Have questions?</strong> Open an issue and ask the community</li>
      </ul>
    </div>
  `;
}