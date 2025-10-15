// Données des joueurs du FC Fulbert
const players = [
    { number: 1, name: 'Martin Dubois', position: 'Gardien', goals: 0, assists: 2, matches: 18 },
    { number: 4, name: 'Alexandre Leroux', position: 'Défenseur', goals: 3, assists: 1, matches: 17 },
    { number: 5, name: 'Thomas Bernard', position: 'Défenseur', goals: 2, assists: 3, matches: 18 },
    { number: 7, name: 'Lucas Moreau', position: 'Milieu', goals: 8, assists: 12, matches: 18 },
    { number: 10, name: 'Julien Petit', position: 'Milieu', goals: 12, assists: 8, matches: 17 },
    { number: 11, name: 'Nicolas Laurent', position: 'Attaquant', goals: 15, assists: 5, matches: 18 },
    { number: 9, name: 'Pierre Roux', position: 'Attaquant', goals: 14, assists: 6, matches: 16 },
    { number: 3, name: 'Antoine Girard', position: 'Défenseur', goals: 1, assists: 2, matches: 15 },
    { number: 8, name: 'Maxime Bonnet', position: 'Milieu', goals: 6, assists: 9, matches: 18 },
];

// Données du classement
const ranking = [
    { position: 1, team: 'AS Chartres', pts: 42, j: 18, g: 13, n: 3, p: 2, diff: '+24' },
    { position: 2, team: 'FC Fulbert', pts: 38, j: 18, g: 12, n: 2, p: 4, diff: '+18', highlight: true },
    { position: 3, team: 'ES Dreux', pts: 35, j: 18, g: 10, n: 5, p: 3, diff: '+12' },
    { position: 4, team: 'US Lucé', pts: 32, j: 18, g: 9, n: 5, p: 4, diff: '+8' },
    { position: 5, team: 'FC Maintenon', pts: 28, j: 18, g: 8, n: 4, p: 6, diff: '+3' },
    { position: 6, team: 'Olympique Nogent', pts: 25, j: 18, g: 7, n: 4, p: 7, diff: '-2' },
    { position: 7, team: 'AS Auneau', pts: 22, j: 18, g: 6, n: 4, p: 8, diff: '-5' },
    { position: 8, team: 'FC Vernouillet', pts: 18, j: 18, g: 5, n: 3, p: 10, diff: '-12' },
];

// Générer les cartes de joueurs
function displayPlayers(playersList) {
    const grid = document.getElementById('playersGrid');
    grid.innerHTML = playersList.map(player => `
        <article class="player-card" itemscope itemtype="http://schema.org/Person">
            <div class="player-number">${player.number}</div>
            <h3 class="player-name" itemprop="name" title="Fiche du joueur ${player.name} - FC Fulbert">${player.name}</h3>
            <p class="player-position" itemprop="jobTitle">${player.position}</p>
            <div class="player-stats">
                <div class="stat" itemprop="numberOfGoals">
                    <div class="stat-value">${player.goals}</div>
                    <div class="stat-label">Buts</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${player.assists}</div>
                    <div class="stat-label">Passes</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${player.matches}</div>
                    <div class="stat-label">Matchs joués</div>
                </div>
            </div>
        </article>
    `).join('');
}

// Générer le tableau de classement
function displayRanking() {
    const table = document.getElementById('rankingTable');
    table.innerHTML = ranking.map(team => `
        <tr class="${team.highlight ? 'highlight-team' : ''}" title="Classement de l'équipe ${team.team}">
            <td class="position">${team.position}</td>
            <td>
                <span class="team-logo">${team.team.charAt(0)}</span>
                <strong>${team.team === 'FC Fulbert' ? 'FC Fulbert' : team.team}</strong>
            </td>
            <td><strong>${team.pts}</strong></td>
            <td>${team.j}</td>
            <td>${team.g}</td>
            <td>${team.n}</td>
            <td>${team.p}</td>
            <td>${team.diff}</td>
        </tr>
    `).join('');
}

// Fonction de recherche
document.getElementById('searchPlayer').addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase();
    const filtered = players.filter(player => 
        player.name.toLowerCase().includes(search) || 
        player.position.toLowerCase().includes(search)
    );
    displayPlayers(filtered);
});

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Initialisation
displayPlayers(players);
displayRanking();

// Animation au scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.player-card, .ranking-table').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(el);
});