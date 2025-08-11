# Board Game Probabilities

A static web application for exploring probability-related data for board games:
- Card symbol draw probabilities (hypergeometric calculations)
- Dice roll sum distributions and custom faces
- Interactive probability calculators with real-time results
- Modular per-game JSON data structure

Designed to be easily upgraded later to pull live metadata (e.g., from BoardGameGeek) without restructuring the codebase.

## Features
- **Interactive Calculators**: Real-time probability calculations for card draws and dice rolls
- **Client-side routing** (`#/game/slug`) for seamless navigation
- **Per-game JSON files** in `gameData/` with standardized schema
- **Manifest system** to index games (`gameData/manifest.json`)
- **Hypergeometric calculations** for "at least k successes" in card draws
- **Dice sum distribution visualization** with probability bars
- **Custom dice support** with string faces for unique game mechanics
- **Extensible schema** with `schemaVersion` for forward compatibility
- **Bold, vibrant design** optimized for readability and engagement

## Project Structure
```
index.html                 # Main HTML entry point
style.css                  # Bold, vibrant CSS styling
gameData/                  # Game data directory
  manifest.json           # Game index and metadata
  sample-fantasy-duel.json # Example game file
  schema.json             # Data structure schema
js/                        # JavaScript modules
  app.js                  # Main application entry
  router.js               # Client-side routing
  data/                   # Data loading utilities
    dataLoader.js         # JSON file loader with caching
    schemaVersion.js      # Schema version management
  utils/                  # Utility functions
    probability.js        # Mathematical calculations
  renderers/              # Page rendering modules
    home.js               # Homepage renderer
    games.js              # Games list renderer
    gameDetail.js         # Individual game renderer
    about.js              # About page renderer
    contribute.js         # Contribution page renderer
```

## Adding a Game
1. **Create JSON file**: Add `gameData/<your-slug>.json` with game data
2. **Update manifest**: Add entry to `gameData/manifest.json` under `games` array
3. **Submit contribution**: Open a pull request with your changes

See `CONTRIBUTING.md` for detailed schema documentation and examples.

## How to Use
1. **Browse games**: Use the homepage search or browse the games list
2. **Explore probabilities**: Navigate to any game page to access calculators
3. **Card calculations**: Enter draw count and minimum successes for probability analysis
4. **Dice distributions**: Click "Show Distribution" to see probability tables
5. **Formula toggle**: Use the checkbox to show/hide mathematical formulas

## JSON Schema (Human-Oriented)
```jsonc
{
  "schemaVersion": "0.1.0",
  "name": "Game Name",
  "slug": "game-slug",
  "bgg_id": 12345,            // optional now, may automate later
  "description": "Short intro.",
  "tags": ["cards","dice"],
  "components": {
    "cards": [
      {
        "deck_name": "Base Deck",
        "total_cards": 60,
        "symbols": [
          { "name": "Fire", "count": 10 },
          { "name": "Water", "count": 8 }
        ]
      }
    ],
    "dice": [
      {
        "name": "Attack Dice",
        "description": "Two d6",
        "dice": [{ "faces": 6 }, { "faces": 6 }]
      },
      {
        "name": "Custom Die",
        "dice": [{ "faces": ["Hit","Hit","Miss","Miss","Crit","Blank"] }]
      }
    ]
  },
  "meta": {
    "created": "ISO timestamp",
    "source": "manual | derived | tool",
    "attribution": "Contributor name/handle"
  }
}
```

## Probability Calculations
- **Card draws**: Uses hypergeometric distribution to calculate probability of drawing at least `k` successes from `n` draws, given population size `N` and `K` success cards
- **Dice sums**: Computes exact probability distributions using convolution of independent dice
- **Custom dice**: Supports non-numeric faces (strings) with individual probability calculations
- **Real-time results**: Instant calculation display with interpretive text and mathematical formulas

## Technical Details
- **Client-side only**: No server required, runs entirely in the browser  
- **ES6 modules**: Modern JavaScript with clean separation of concerns
- **JSON-based data**: Extensible schema for easy game additions
- **Responsive design**: Works on desktop and mobile devices
- **Accessible**: Proper semantic HTML and keyboard navigation support

## Future Enhancements
- Add cumulative probability graphs and visualizations
- Implement LocalStorage for recent games and preferences  
- Create remote data fetcher wrapper for external APIs
- Add BGG ID auto-lookup integration (when dynamic hosting is available)
- Expand symbol synergy scenarios (multi-symbol probability calculations)
- Add dice comparison tools and statistical analysis

## License
See `LICENSE`.
