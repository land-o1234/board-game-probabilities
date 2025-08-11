export function renderAddGame() {
  return `
    <div class="add-game-hero">
      <h2>🎮 Add New Game</h2>
      <p class="hero-text">Use this form to generate JSON data for your board game. No coding required!</p>
    </div>
    
    <div class="add-game-container">
      <div class="form-section">
        <h3>📝 Game Information</h3>
        <form id="game-form" class="game-form">
          <div class="form-group">
            <label for="game-name">Game Name *</label>
            <input type="text" id="game-name" required placeholder="e.g., Monopoly">
          </div>
          
          <div class="form-group">
            <label for="game-slug">URL Slug *</label>
            <input type="text" id="game-slug" required placeholder="e.g., monopoly (lowercase, hyphens for spaces)">
            <small>Auto-generated from name, but you can customize</small>
          </div>
          
          <div class="form-group">
            <label for="game-description">Description</label>
            <textarea id="game-description" placeholder="Brief description of the game"></textarea>
          </div>
          
          <div class="form-group">
            <label for="bgg-id">BoardGameGeek ID (optional)</label>
            <input type="number" id="bgg-id" placeholder="e.g., 13">
          </div>
          
          <div class="form-group">
            <label for="game-status">Completion Status *</label>
            <select id="game-status" required>
              <option value="complete">Complete - All data verified</option>
              <option value="partial">Partial - Some data missing</option>
              <option value="incomplete">Incomplete - Basic structure only</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="game-tags">Tags (comma-separated)</label>
            <input type="text" id="game-tags" placeholder="e.g., cards, dice, strategy">
          </div>
        </form>
      </div>

      <div class="form-section" id="tasks-section" style="display: none;">
        <h3>📋 Task List</h3>
        <p>Add tasks for incomplete games to track what still needs to be done.</p>
        <div id="tasks-container"></div>
        <button type="button" id="add-task-btn" class="btn btn-secondary">+ Add Task</button>
      </div>
      
      <div class="form-section">
        <h3>🃏 Card Decks</h3>
        <p>Add card decks and their symbol distributions.</p>
        <div id="cards-container"></div>
        <button type="button" id="add-deck-btn" class="btn btn-secondary">+ Add Deck</button>
      </div>
      
      <div class="form-section">
        <h3>🎲 Dice</h3>
        <p>Add dice sets used in the game.</p>
        <div id="dice-container"></div>
        <button type="button" id="add-dice-btn" class="btn btn-secondary">+ Add Dice Set</button>
      </div>
      
      <div class="form-section">
        <h3>🚀 Expansions</h3>
        <p>Add expansions that can modify the base game by adding to existing components or creating new ones. Each expansion can do both!</p>
        <div id="expansions-container"></div>
        <button type="button" id="add-expansion-btn" class="btn btn-secondary">+ Add Expansion</button>
      </div>
      
      <div class="form-section">
        <h3>👤 Attribution</h3>
        <div class="form-group">
          <label for="attribution">Your Name/Handle</label>
          <input type="text" id="attribution" placeholder="e.g., GameMaster42">
        </div>
      </div>
      
      <div class="form-actions">
        <button type="button" id="generate-json-btn" class="btn btn-primary">🚀 Generate JSON</button>
        <button type="button" id="clear-form-btn" class="btn btn-secondary">Clear Form</button>
      </div>
    </div>
    
    <div id="json-output" class="output-section" style="display: none;">
      <h3>📄 Generated JSON</h3>
      <p>Copy this JSON content and follow the instructions below:</p>
      <div class="json-container">
        <pre id="json-content"></pre>
        <button type="button" id="copy-json-btn" class="btn btn-small">📋 Copy JSON</button>
      </div>
      
      <div class="instructions">
        <h4>📝 Next Steps:</h4>
        <ol>
          <li><strong>Copy the JSON above</strong> using the copy button</li>
          <li><strong>Fork the repository</strong> at <a href="https://github.com/land-o1234/board-game-probabilities" target="_blank">GitHub</a></li>
          <li><strong>Create a new file</strong> called <code>gameData/<span id="filename-slug">your-game</span>.json</code></li>
          <li><strong>Paste the JSON</strong> into the new file</li>
          <li><strong>Update manifest.json</strong> by adding your game entry to the games array</li>
          <li><strong>Submit a pull request</strong> with your changes</li>
        </ol>
        <p class="help-note">💡 Need help? Check out our <a href="#/contribute">detailed contribution guide</a>.</p>
      </div>
    </div>
  `;
}

// Initialize form functionality when the DOM content is loaded
export function initializeAddGameForm() {
  const form = document.getElementById('game-form');
  if (!form) return;

  // Auto-generate slug from name
  const nameInput = document.getElementById('game-name');
  const slugInput = document.getElementById('game-slug');
  
  nameInput.addEventListener('input', () => {
    if (!slugInput.dataset.manual) {
      slugInput.value = nameInput.value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }
  });
  
  slugInput.addEventListener('input', () => {
    slugInput.dataset.manual = 'true';
  });

  // Show/hide tasks section based on status
  const statusSelect = document.getElementById('game-status');
  const tasksSection = document.getElementById('tasks-section');
  
  statusSelect.addEventListener('change', () => {
    if (statusSelect.value === 'incomplete' || statusSelect.value === 'partial') {
      tasksSection.style.display = 'block';
    } else {
      tasksSection.style.display = 'none';
    }
  });

  // Task management
  let taskCounter = 0;
  document.getElementById('add-task-btn').addEventListener('click', addTask);
  
  function addTask() {
    const container = document.getElementById('tasks-container');
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-item';
    taskDiv.innerHTML = `
      <div class="form-group">
        <input type="text" class="task-description" placeholder="Task description" required>
        <label class="checkbox-label">
          <input type="checkbox" class="task-completed"> Completed
        </label>
        <button type="button" class="btn btn-small btn-danger remove-task">✖</button>
      </div>
    `;
    container.appendChild(taskDiv);
    
    taskDiv.querySelector('.remove-task').addEventListener('click', () => {
      taskDiv.remove();
    });
  }

  // Deck management
  let deckCounter = 0;
  document.getElementById('add-deck-btn').addEventListener('click', addDeck);
  
  function addDeck() {
    const container = document.getElementById('cards-container');
    const deckDiv = document.createElement('div');
    deckDiv.className = 'deck-item';
    deckDiv.innerHTML = `
      <div class="form-group-inline">
        <div class="form-group">
          <label>Deck Name</label>
          <input type="text" class="deck-name" placeholder="e.g., Base Deck" required>
        </div>
        <div class="form-group">
          <label>Total Cards</label>
          <input type="number" class="deck-total" min="1" placeholder="e.g., 60" required>
        </div>
        <button type="button" class="btn btn-small btn-danger remove-deck">✖</button>
      </div>
      <div class="symbols-container">
        <h5>Card Symbols/Types</h5>
        <div class="symbols-list"></div>
        <button type="button" class="btn btn-small add-symbol">+ Add Symbol</button>
      </div>
    `;
    container.appendChild(deckDiv);
    
    deckDiv.querySelector('.remove-deck').addEventListener('click', () => {
      deckDiv.remove();
    });
    
    deckDiv.querySelector('.add-symbol').addEventListener('click', () => {
      addSymbol(deckDiv.querySelector('.symbols-list'));
    });
  }
  
  function addSymbol(container) {
    const symbolDiv = document.createElement('div');
    symbolDiv.className = 'symbol-item';
    symbolDiv.innerHTML = `
      <div class="form-group-inline">
        <input type="text" class="symbol-name" placeholder="Symbol name" required>
        <input type="number" class="symbol-count" min="0" placeholder="Count" required>
        <button type="button" class="btn btn-small btn-danger remove-symbol">✖</button>
      </div>
    `;
    container.appendChild(symbolDiv);
    
    symbolDiv.querySelector('.remove-symbol').addEventListener('click', () => {
      symbolDiv.remove();
    });
  }

  // Dice management
  let diceCounter = 0;
  document.getElementById('add-dice-btn').addEventListener('click', addDiceSet);
  
  function addDiceSet() {
    const container = document.getElementById('dice-container');
    const diceDiv = document.createElement('div');
    diceDiv.className = 'dice-item';
    diceDiv.innerHTML = `
      <div class="form-group">
        <label>Dice Set Name</label>
        <input type="text" class="dice-name" placeholder="e.g., Combat Dice" required>
      </div>
      <div class="form-group">
        <label>Description</label>
        <input type="text" class="dice-description" placeholder="e.g., Two d6 for combat">
      </div>
      <div class="dice-list">
        <h5>Individual Dice</h5>
        <div class="individual-dice"></div>
        <button type="button" class="btn btn-small add-die">+ Add Die</button>
      </div>
      <button type="button" class="btn btn-small btn-danger remove-dice-set">✖ Remove Set</button>
    `;
    container.appendChild(diceDiv);
    
    diceDiv.querySelector('.remove-dice-set').addEventListener('click', () => {
      diceDiv.remove();
    });
    
    diceDiv.querySelector('.add-die').addEventListener('click', () => {
      addIndividualDie(diceDiv.querySelector('.individual-dice'));
    });
  }
  
  function addIndividualDie(container) {
    const dieDiv = document.createElement('div');
    dieDiv.className = 'die-item';
    dieDiv.innerHTML = `
      <div class="form-group-inline">
        <select class="die-type">
          <option value="standard">Standard (e.g., d6, d20)</option>
          <option value="custom">Custom Faces</option>
        </select>
        <div class="standard-die" style="display: block;">
          <input type="number" class="die-faces" min="2" placeholder="6" required>
          <span>faces</span>
        </div>
        <div class="custom-die" style="display: none;">
          <input type="text" class="custom-faces" placeholder="Hit,Miss,Crit (comma-separated)">
        </div>
        <button type="button" class="btn btn-small btn-danger remove-die">✖</button>
      </div>
    `;
    container.appendChild(dieDiv);
    
    const typeSelect = dieDiv.querySelector('.die-type');
    const standardDiv = dieDiv.querySelector('.standard-die');
    const customDiv = dieDiv.querySelector('.custom-die');
    
    typeSelect.addEventListener('change', () => {
      if (typeSelect.value === 'standard') {
        standardDiv.style.display = 'block';
        customDiv.style.display = 'none';
      } else {
        standardDiv.style.display = 'none';
        customDiv.style.display = 'block';
      }
    });
    
    dieDiv.querySelector('.remove-die').addEventListener('click', () => {
      dieDiv.remove();
    });
  }

  // Expansion management
  let expansionCounter = 0;
  document.getElementById('add-expansion-btn').addEventListener('click', addExpansion);
  
  function addExpansion() {
    const container = document.getElementById('expansions-container');
    const expansionDiv = document.createElement('div');
    expansionDiv.className = 'expansion-item';
    expansionDiv.innerHTML = `
      <div class="expansion-header">
        <div class="form-group-inline">
          <div class="form-group" style="flex: 1;">
            <label>Expansion Name</label>
            <input type="text" class="expansion-name" placeholder="e.g., Power Up!" required>
          </div>
          <div class="form-group">
            <label>Default State</label>
            <label class="checkbox-label">
              <input type="checkbox" class="expansion-enabled" checked> Enabled by default
            </label>
          </div>
          <button type="button" class="btn btn-small btn-danger remove-expansion">✖</button>
        </div>
        <div class="form-group">
          <label>Description (optional)</label>
          <textarea class="expansion-description" placeholder="Brief description of what this expansion adds" rows="2"></textarea>
        </div>
      </div>
      
      <div class="expansion-content">
        <div class="expansion-section adds-to-section">
          <div class="section-header">
            <h5>➕ Adds to Existing Decks</h5>
            <p class="section-description">Add cards to decks that already exist in the base game (optional)</p>
          </div>
          <div class="adds-to-container"></div>
          <button type="button" class="btn btn-small btn-secondary add-deck-modification">+ Add Deck Modification</button>
        </div>
        
        <div class="expansion-section new-components-section">
          <div class="section-header">
            <h5>🆕 Creates New Components</h5>
            <p class="section-description">Introduce entirely new card decks and dice sets (optional)</p>
          </div>
          
          <div class="new-cards-subsection">
            <h6>New Card Decks</h6>
            <div class="expansion-new-cards"></div>
            <button type="button" class="btn btn-small btn-secondary add-expansion-deck">+ Add New Deck</button>
          </div>
          
          <div class="new-dice-subsection">
            <h6>New Dice Sets</h6>
            <div class="expansion-new-dice"></div>
            <button type="button" class="btn btn-small btn-secondary add-expansion-dice">+ Add New Dice Set</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(expansionDiv);
    
    // Remove expansion
    expansionDiv.querySelector('.remove-expansion').addEventListener('click', () => {
      expansionDiv.remove();
    });
    
    // Add deck modification functionality
    expansionDiv.querySelector('.add-deck-modification').addEventListener('click', () => {
      addDeckModification(expansionDiv.querySelector('.adds-to-container'));
    });
    
    // Add new expansion deck functionality
    expansionDiv.querySelector('.add-expansion-deck').addEventListener('click', () => {
      addExpansionDeck(expansionDiv.querySelector('.expansion-new-cards'));
    });
    
    // Add new expansion dice functionality
    expansionDiv.querySelector('.add-expansion-dice').addEventListener('click', () => {
      addExpansionDice(expansionDiv.querySelector('.expansion-new-dice'));
    });
  }
  
  function addDeckModification(container) {
    const modDiv = document.createElement('div');
    modDiv.className = 'deck-modification-item';
    modDiv.innerHTML = `
      <div class="form-group-inline">
        <div class="form-group">
          <label>Target Deck Name</label>
          <input type="text" class="target-deck-name" placeholder="e.g., Power Cards" required>
        </div>
        <button type="button" class="btn btn-small btn-danger remove-mod">✖</button>
      </div>
      <div class="mod-symbols-container">
        <h6>Additional Symbols/Types</h6>
        <div class="mod-symbols-list"></div>
        <button type="button" class="btn btn-small add-mod-symbol">+ Add Symbol</button>
      </div>
    `;
    container.appendChild(modDiv);
    
    modDiv.querySelector('.remove-mod').addEventListener('click', () => {
      modDiv.remove();
    });
    
    modDiv.querySelector('.add-mod-symbol').addEventListener('click', () => {
      addSymbol(modDiv.querySelector('.mod-symbols-list'));
    });
  }
  
  function addExpansionDeck(container) {
    const deckDiv = document.createElement('div');
    deckDiv.className = 'expansion-deck-item';
    deckDiv.innerHTML = `
      <div class="form-group-inline">
        <div class="form-group">
          <label>Deck Name</label>
          <input type="text" class="expansion-deck-name" placeholder="e.g., Evolution Cards" required>
        </div>
        <div class="form-group">
          <label>Total Cards</label>
          <input type="number" class="expansion-deck-total" min="1" placeholder="e.g., 56" required>
        </div>
        <button type="button" class="btn btn-small btn-danger remove-expansion-deck">✖</button>
      </div>
      <div class="expansion-deck-symbols">
        <h6>Card Symbols/Types</h6>
        <div class="expansion-deck-symbols-list"></div>
        <button type="button" class="btn btn-small add-expansion-deck-symbol">+ Add Symbol</button>
      </div>
    `;
    container.appendChild(deckDiv);
    
    deckDiv.querySelector('.remove-expansion-deck').addEventListener('click', () => {
      deckDiv.remove();
    });
    
    deckDiv.querySelector('.add-expansion-deck-symbol').addEventListener('click', () => {
      addSymbol(deckDiv.querySelector('.expansion-deck-symbols-list'));
    });
  }
  
  function addExpansionDice(container) {
    const diceDiv = document.createElement('div');
    diceDiv.className = 'expansion-dice-item';
    diceDiv.innerHTML = `
      <div class="form-group">
        <label>Dice Set Name</label>
        <input type="text" class="expansion-dice-name" placeholder="e.g., Chaos Dice" required>
      </div>
      <div class="form-group">
        <label>Description</label>
        <input type="text" class="expansion-dice-description" placeholder="e.g., Unpredictable elemental dice">
      </div>
      <div class="expansion-dice-list">
        <h6>Individual Dice</h6>
        <div class="expansion-individual-dice"></div>
        <button type="button" class="btn btn-small add-expansion-die">+ Add Die</button>
      </div>
      <button type="button" class="btn btn-small btn-danger remove-expansion-dice-set">✖ Remove Set</button>
    `;
    container.appendChild(diceDiv);
    
    diceDiv.querySelector('.remove-expansion-dice-set').addEventListener('click', () => {
      diceDiv.remove();
    });
    
    diceDiv.querySelector('.add-expansion-die').addEventListener('click', () => {
      addIndividualDie(diceDiv.querySelector('.expansion-individual-dice'));
    });
  }

  // Generate JSON
  document.getElementById('generate-json-btn').addEventListener('click', generateJSON);
  
  function generateJSON() {
    const formData = collectFormData();
    if (!formData) return;
    
    const jsonOutput = document.getElementById('json-output');
    const jsonContent = document.getElementById('json-content');
    const filenameSlug = document.getElementById('filename-slug');
    
    jsonContent.textContent = JSON.stringify(formData, null, 2);
    filenameSlug.textContent = formData.slug;
    jsonOutput.style.display = 'block';
    jsonOutput.scrollIntoView({ behavior: 'smooth' });
  }
  
  function collectFormData() {
    // Basic validation
    const name = document.getElementById('game-name').value.trim();
    const slug = document.getElementById('game-slug').value.trim();
    const status = document.getElementById('game-status').value;
    
    if (!name || !slug) {
      alert('Please fill in the required fields: Game Name and URL Slug');
      return null;
    }
    
    const gameData = {
      schemaVersion: "0.1.0",
      name: name,
      slug: slug,
      description: document.getElementById('game-description').value.trim() || "",
      tags: document.getElementById('game-tags').value.split(',').map(t => t.trim()).filter(t => t),
      status: status
    };
    
    const bggId = document.getElementById('bgg-id').value;
    if (bggId) {
      gameData.bgg_id = parseInt(bggId);
    }
    
    // Collect tasks if incomplete/partial
    if (status === 'incomplete' || status === 'partial') {
      const tasks = [];
      document.querySelectorAll('.task-item').forEach(item => {
        const description = item.querySelector('.task-description').value.trim();
        const completed = item.querySelector('.task-completed').checked;
        if (description) {
          tasks.push({ description, completed });
        }
      });
      if (tasks.length > 0) {
        gameData.tasks = tasks;
      }
    }
    
    // Collect components
    gameData.components = {};
    
    // Cards
    const cards = [];
    document.querySelectorAll('.deck-item').forEach(item => {
      const name = item.querySelector('.deck-name').value.trim();
      const total = parseInt(item.querySelector('.deck-total').value);
      
      if (name && total) {
        const symbols = [];
        item.querySelectorAll('.symbol-item').forEach(symbolItem => {
          const symbolName = symbolItem.querySelector('.symbol-name').value.trim();
          const symbolCount = parseInt(symbolItem.querySelector('.symbol-count').value);
          if (symbolName && !isNaN(symbolCount)) {
            symbols.push({ name: symbolName, count: symbolCount });
          }
        });
        
        const deck = {
          deck_name: name,
          total_cards: total,
          symbols: symbols
        };
        cards.push(deck);
      }
    });
    if (cards.length > 0) {
      gameData.components.cards = cards;
    }
    
    // Dice
    const dice = [];
    document.querySelectorAll('.dice-item').forEach(item => {
      const name = item.querySelector('.dice-name').value.trim();
      const description = item.querySelector('.dice-description').value.trim();
      
      if (name) {
        const diceArray = [];
        item.querySelectorAll('.die-item').forEach(dieItem => {
          const type = dieItem.querySelector('.die-type').value;
          if (type === 'standard') {
            const faces = parseInt(dieItem.querySelector('.die-faces').value);
            if (!isNaN(faces) && faces >= 2) {
              diceArray.push({ faces: faces });
            }
          } else {
            const customFaces = dieItem.querySelector('.custom-faces').value.trim();
            if (customFaces) {
              const facesArray = customFaces.split(',').map(f => f.trim()).filter(f => f);
              if (facesArray.length >= 2) {
                diceArray.push({ faces: facesArray });
              }
            }
          }
        });
        
        if (diceArray.length > 0) {
          const diceSet = {
            name: name,
            dice: diceArray
          };
          if (description) {
            diceSet.description = description;
          }
          dice.push(diceSet);
        }
      }
    });
    if (dice.length > 0) {
      gameData.components.dice = dice;
    }
    
    // Expansions
    const expansions = [];
    document.querySelectorAll('.expansion-item').forEach(item => {
      const name = item.querySelector('.expansion-name').value.trim();
      const enabled = item.querySelector('.expansion-enabled').checked;
      const description = item.querySelector('.expansion-description').value.trim();
      
      if (name) {
        const expansion = {
          name: name,
          enabled: enabled
        };
        
        if (description) {
          expansion.description = description;
        }
        
        // Collect adds_to modifications
        const addsTo = {};
        const cardMods = {};
        item.querySelectorAll('.deck-modification-item').forEach(modItem => {
          const targetDeck = modItem.querySelector('.target-deck-name').value.trim();
          if (targetDeck) {
            const symbols = [];
            modItem.querySelectorAll('.symbol-item').forEach(symbolItem => {
              const symbolName = symbolItem.querySelector('.symbol-name').value.trim();
              const symbolCount = parseInt(symbolItem.querySelector('.symbol-count').value);
              if (symbolName && !isNaN(symbolCount)) {
                symbols.push({ name: symbolName, count: symbolCount });
              }
            });
            if (symbols.length > 0) {
              cardMods[targetDeck] = { symbols: symbols };
            }
          }
        });
        if (Object.keys(cardMods).length > 0) {
          addsTo.cards = cardMods;
        }
        if (Object.keys(addsTo).length > 0) {
          expansion.adds_to = addsTo;
        }
        
        // Collect new_components
        const newComponents = {};
        
        // New card decks
        const newCards = [];
        item.querySelectorAll('.expansion-deck-item').forEach(deckItem => {
          const deckName = deckItem.querySelector('.expansion-deck-name').value.trim();
          const deckTotal = parseInt(deckItem.querySelector('.expansion-deck-total').value);
          
          if (deckName && deckTotal) {
            const symbols = [];
            deckItem.querySelectorAll('.symbol-item').forEach(symbolItem => {
              const symbolName = symbolItem.querySelector('.symbol-name').value.trim();
              const symbolCount = parseInt(symbolItem.querySelector('.symbol-count').value);
              if (symbolName && !isNaN(symbolCount)) {
                symbols.push({ name: symbolName, count: symbolCount });
              }
            });
            
            const deck = {
              deck_name: deckName,
              total_cards: deckTotal,
              symbols: symbols
            };
            newCards.push(deck);
          }
        });
        if (newCards.length > 0) {
          newComponents.cards = newCards;
        }
        
        // New dice sets
        const newDice = [];
        item.querySelectorAll('.expansion-dice-item').forEach(diceItem => {
          const diceName = diceItem.querySelector('.expansion-dice-name').value.trim();
          const diceDescription = diceItem.querySelector('.expansion-dice-description').value.trim();
          
          if (diceName) {
            const diceArray = [];
            diceItem.querySelectorAll('.die-item').forEach(dieItem => {
              const type = dieItem.querySelector('.die-type').value;
              if (type === 'standard') {
                const faces = parseInt(dieItem.querySelector('.die-faces').value);
                if (!isNaN(faces) && faces >= 2) {
                  diceArray.push({ faces: faces });
                }
              } else {
                const customFaces = dieItem.querySelector('.custom-faces').value.trim();
                if (customFaces) {
                  const facesArray = customFaces.split(',').map(f => f.trim()).filter(f => f);
                  if (facesArray.length >= 2) {
                    diceArray.push({ faces: facesArray });
                  }
                }
              }
            });
            
            if (diceArray.length > 0) {
              const diceSet = {
                name: diceName,
                dice: diceArray
              };
              if (diceDescription) {
                diceSet.description = diceDescription;
              }
              newDice.push(diceSet);
            }
          }
        });
        if (newDice.length > 0) {
          newComponents.dice = newDice;
        }
        
        if (Object.keys(newComponents).length > 0) {
          expansion.new_components = newComponents;
        }
        
        expansions.push(expansion);
      }
    });
    if (expansions.length > 0) {
      gameData.expansions = expansions;
    }
    
    // Meta
    const attribution = document.getElementById('attribution').value.trim();
    gameData.meta = {
      created: new Date().toISOString(),
      source: "form",
      attribution: attribution || "Anonymous"
    };
    
    return gameData;
  }

  // Copy JSON functionality
  document.getElementById('copy-json-btn').addEventListener('click', () => {
    const jsonContent = document.getElementById('json-content').textContent;
    navigator.clipboard.writeText(jsonContent).then(() => {
      const btn = document.getElementById('copy-json-btn');
      const originalText = btn.textContent;
      btn.textContent = '✅ Copied!';
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    });
  });

  // Clear form
  document.getElementById('clear-form-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all form data?')) {
      form.reset();
      document.getElementById('cards-container').innerHTML = '';
      document.getElementById('dice-container').innerHTML = '';
      document.getElementById('tasks-container').innerHTML = '';
      document.getElementById('expansions-container').innerHTML = '';
      document.getElementById('json-output').style.display = 'none';
      document.getElementById('tasks-section').style.display = 'none';
      slugInput.dataset.manual = '';
    }
  });
}