# Contributing

Thanks for helping improve Board Game Probabilities!

## Quick Steps
1. Fork the repo.
2. Create a feature branch.
3. Add or update JSON in `gameData/`.
4. Update `gameData/manifest.json`.
5. Run a local static server (e.g. `python -m http.server`) and test.
6. Open a pull request describing your changes.

## Game Manifest
`gameData/manifest.json` keeps a lightweight list of discoverable games:
```json
{
  "schemaVersion": "0.1.0",
  "games": [
    {
      "slug": "sample-fantasy-duel",
      "name": "Sample Fantasy Duel",
      "tags": ["cards","dice"],
      "shortDescription": "Demo game entry showing cards + dice components.",
      "schemaVersion": "0.1.0"
    }
  ]
}
```

Each entry:
- `slug`: File base name + route segment
- `name`: Display name
- `tags`: Optional classification
- `shortDescription`: Optional
- `schemaVersion`: Match your game JSON’s schemaVersion

## Game JSON Schema (Current Version 0.1.0)
```jsonc
{
  "schemaVersion": "0.1.0",
  "name": "Game Name",
  "slug": "game-slug",
  "bgg_id": 123456,           // optional
  "description": "Short description.",
  "tags": ["cards","dice"],
  "components": {
    "cards": [
      {
        "deck_name": "Base Deck",
        "total_cards": 60,
        "symbols": [
          { "name": "Symbol Label", "count": 10 }
        ]
      }
    ],
    "dice": [
      {
        "name": "Attack Dice",
        "description": "Two d6.",
        "dice": [{ "faces": 6 }, { "faces": 6 }]
      }
    ]
  },
  "meta": {
    "created": "2025-08-10T00:00:00Z",
    "source": "manual",
    "attribution": "YourHandle"
  }
}
```

### Notes
- Omit sections not relevant (e.g., no dice).
- Keep counts accurate; validations are minimal client-side.
- Use lowercase-hyphenated slug; no spaces.
- Provide `bgg_id` when known for future dynamic enhancement.

## Probability Model
- Card symbol probability uses hypergeometric distribution for “at least k” successes.
- Dice distribution: sums for independent fair dice or custom face arrays.

## Style & Formatting
- JSON: 2 spaces, no trailing commas.
- Keep arrays reasonably ordered (e.g., alphabetical symbols if helpful).

## Future Compatibility
If the schema changes:
- Increment `schemaVersion`.
- Provide migration notes in README.

## Questions
Open a discussion or issue in the repository.

Happy contributing!