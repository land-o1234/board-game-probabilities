export function renderContribute() {
  return `
    <h2>Contribute</h2>
    <p>Add or improve game data by submitting a pull request with a new <code>gameData/*.json</code> file and updating <code>gameData/manifest.json</code>.</p>
    <ol>
      <li>Fork the repository.</li>
      <li>Create <code>gameData/your-game-slug.json</code>.</li>
      <li>Add your game entry to <code>manifest.json</code>.</li>
      <li>Open a pull request describing your changes.</li>
    </ol>
    <p>See the README and <code>CONTRIBUTING.md</code> for detailed schema and examples.</p>
  `;
}