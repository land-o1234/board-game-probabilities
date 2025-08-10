# Board Game Probabilities

A static (for now) site that lets you explore probability-related data for board games:
- Card symbol draw probabilities (hypergeometric calculations)
- Dice roll sum distributions and custom faces
- Modular per-game JSON data

Designed to be easily upgraded later to pull live metadata (e.g., from BoardGameGeek) without restructuring the whole codebase.

## Live Site (GitHub Pages)
(Configure pages and add the URL here once enabled.)

## Features
- Client-side routing (`#/game/slug`)
- Per-game JSON files in `gameData/`
- Manifest file to index games (`gameData/manifest.json`)
- Hypergeometric calculations for "at least k successes" in draws
- Dice sum distribution visualization
- Extensible schema with `schemaVersion` for forward compatibility

## Project Structure
```
index.html
style.css
gameData/
  manifest.json
  sample-fantasy-duel.json
js/
  app.js
  router.js
  data/
    dataLoader.js
    schemaVersion.js
  utils/
    probability.js
  renderers/
    home.js
    games.js
    gameDetail.js
    about.js
    contribute.js
```

## Adding a Game
1. Create a new JSON file: `gameData/<your-slug>.json`
2. Add an entry to `gameData/manifest.json` under `games`.
3. Open a pull request.

See `CONTRIBUTING.md` for the schema and examples.

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

## Probability Details
- Card draws: Hypergeometric distribution (population `N`, successes `K`, draws `n`, threshold `k`).
- Dice sums: Convolution of independent dice. Custom faces supported by listing string labels; sums only shown numerically (string faces are not aggregated into sums—future enhancement).

## Roadmap Ideas
- Add cumulative probability graphs
- LocalStorage to remember recent games
- Optional remote fetcher wrapper
- BGG ID autolookup (when dynamic hosting is possible)
- Symbol synergy scenarios (multi-symbol probability)

## License
See `LICENSE`.
