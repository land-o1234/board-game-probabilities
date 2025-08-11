export function renderContribute() {
  return `
    <div class="contribute-hero">
      <h2>🎮 Help Us Grow!</h2>
      <p class="hero-text">Love board games? Help fellow players by adding probability data for your favorite games!</p>
    </div>
    
    <div class="contribute-section">
      <h3>🚀 Easy Ways to Contribute</h3>
      <div class="card-grid">
        <div class="card highlight-card">
          <h4>🆕 Use Our Game Form</h4>
          <p>NEW! Use our interactive form to generate JSON data automatically. No coding required!</p>
          <a href="#/add-game" class="btn btn-primary">🎯 Try the Form</a>
          <p class="muted">Perfect for: Anyone! Beginner-friendly tool</p>
        </div>
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
      <h3>📝 Two Ways to Add Games</h3>
      
      <div class="method-comparison">
        <div class="method-card">
          <h4>🎯 Interactive Form (Recommended)</h4>
          <div class="method-pros">
            <h5>✅ Advantages:</h5>
            <ul>
              <li>No coding required</li>
              <li>Real-time validation</li>
              <li>Auto-generated JSON</li>
              <li>Step-by-step guidance</li>
              <li>Support for completion status & tasks</li>
            </ul>
          </div>
          <a href="#/add-game" class="btn btn-primary">Start Adding Game</a>
        </div>
        
        <div class="method-card">
          <h4>📝 Manual JSON (Advanced)</h4>
          <div class="method-pros">
            <h5>⚡ For experienced users:</h5>
            <ul>
              <li>Full control over structure</li>
              <li>Faster for complex games</li>
              <li>Good for bulk additions</li>
              <li>Direct file editing</li>
            </ul>
          </div>
          <p><a href="gameData/schema.json" target="_blank">View Schema</a> | <a href="#/games">See Examples</a></p>
        </div>
      </div>
    </div>

    <div class="contribute-section">
      <h3>📚 Resources</h3>
      <div class="resources-grid">
        <a href="#/add-game" class="resource-link highlight-resource">
          <strong>🎯 Interactive Form</strong>
          <p>Easy tool to generate game JSON with guided steps</p>
        </a>
        <a href="gameData/schema.json" class="resource-link" target="_blank">
          <strong>📖 Schema Documentation</strong>
          <p>Learn the JSON structure for game data</p>
        </a>
        <a href="#/games" class="resource-link">
          <strong>🎲 Example Games</strong>
          <p>See how existing games are structured</p>
        </a>
        <a href="CONTRIBUTING.md" class="resource-link" target="_blank">
          <strong>🤝 Contributing Guidelines</strong>
          <p>Best practices and code of conduct</p>
        </a>
      </div>
    </div>

    <div class="contribute-section">
      <h3>🔥 Game Completion Status</h3>
      <p>We now track completion status for each game to help contributors know where help is needed:</p>
      <div class="status-examples">
        <div class="status-item">
          <span class="badge">✅ Complete</span>
          <span>All major data is verified and comprehensive</span>
        </div>
        <div class="status-item">
          <span class="badge status-partial">⚠️ Partial Data</span>
          <span>Some components missing or need verification</span>
        </div>
        <div class="status-item">
          <span class="badge status-incomplete">🚧 Incomplete</span>
          <span>Basic structure only, significant work needed</span>
        </div>
      </div>
      <p class="muted">Games with tasks lists show exactly what needs to be completed. Perfect for finding ways to contribute!</p>
    </div>

    <div class="contribute-section">
      <h3>❓ Need Help?</h3>
      <p>Don't worry if you're new to this! The community is friendly and helpful.</p>
      <ul class="help-list">
        <li>🎯 <strong>Start with the form!</strong> Our new interactive tool makes it super easy</li>
        <li>🎮 <strong>Not sure about probabilities?</strong> Start with simple card counting</li>
        <li>💻 <strong>New to GitHub?</strong> Check out GitHub's guides for beginners</li>
        <li>🤔 <strong>Have questions?</strong> Open an issue and ask the community</li>
      </ul>
    </div>
  `;
}