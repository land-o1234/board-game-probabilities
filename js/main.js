const games = [];

fetch('gameData/index.json')
    .then(response => response.json())
    .then(data => {
        games.push(...data.games);
        console.log('Games loaded:', games);
    })
    .catch(error => console.error('Error loading games:', error));

function searchGameIndex(query) {
    const searchResults = [];
    const searchQuery = query.toLowerCase();

    for (const game of games) {
        if (game.title.toLowerCase().includes(searchQuery)) {
            searchResults.push(game);
        }
    }

    return searchResults;

};

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('game-search');
    const resultsDiv = document.getElementById('results');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting normally
        
        const query = searchInput.value.trim();
        if (query) {
            const searchResults = searchGameIndex(query);
            displayResults(searchResults);
        }
    });

    function displayResults(results) {
        resultsDiv.innerHTML = ''; // Clear previous results
        
        if (results.length === 0) {
            resultsDiv.innerHTML = '<p>No games found matching your search.</p>';
            return;
        }

        const resultsList = document.createElement('ul');
        results.forEach(game => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `probability.html?game=${game.id || game.title.toLowerCase().replace(/\s+/g, '-')}`;
            link.textContent = game.title;
            listItem.appendChild(link);
            resultsList.appendChild(listItem);
        });
        
        resultsDiv.appendChild(resultsList);
    }
});