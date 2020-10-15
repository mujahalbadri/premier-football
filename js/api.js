const API_TOKEN = 'a283ceb94f284f39be0e1fd3438b365f';
const BASE_URL = 'https://api.football-data.org/v2/';

const LEAGUE_ID = 2021;

const URL_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const URL_SCORERS = `${BASE_URL}competitions/${LEAGUE_ID}/scorers`;
const URL_MATCHES = `${BASE_URL}competitions/${LEAGUE_ID}/matches?status=FINISHED`;
const URL_TEAMS = `${BASE_URL}teams/`;

const fetchAPI = (url) => fetch(url, {
  headers: {
    'X-Auth-Token': API_TOKEN,
  },
})
  .then(status)
  .then(json)
  .catch(error);

function status(response) {
  if (response.status !== 200) {
    console.log(`Error: ${response.status}`);
    return Promise.reject(new Error(response.statusText));
  }
  return Promise.resolve(response);
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log(`Error : ${error}`);
}

function getAllStandings() {
  if ('caches' in window) {
    caches.match(URL_COMPETITION).then((response) => {
      if (response) {
        response.json().then((data) => {
          showStanding(data);
        });
      }
    });
  }

  fetchAPI(URL_COMPETITION)
    .then((data) => {
      showStanding(data);
    })
    .catch(error);
}

function showStanding(data) {
  let standings = '';
  const standingElement = document.getElementById('homeStandings');
  const preLoad = document.querySelector('.preloader-background');
  preLoad.className += ' hidden';

  data.standings[0].table.forEach((standing) => {
    standings += `
      <tr>
        <td class="center">${standing.position}</td>
        <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge" onerror="this.onerror=null;this.src='img/icon/icon-512x512.png'"/></td>
        <td><a href="./team.html?id=${standing.team.id}">${standing.team.name}</a></td>
        <td>${standing.won}</td>
        <td>${standing.draw}</td>
        <td>${standing.lost}</td>
        <td>${standing.goalsFor}</td>
        <td>${standing.goalsAgainst}</td>
        <td>${standing.goalDifference}</td>
        <td>${standing.points}</td>
      </tr>
      `;
  });

  standingElement.innerHTML = `
    <div class="card hoverable" style="padding-left: 20px; padding-right: 20px; margin-top: 30px;">

    <table class="striped responsive-table">
      <thead>
        <tr>
          <th class="center">Pos</th>
          <th></th>
          <th>Team Name</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GF</th>
          <th>GA</th>
          <th>GD</th>
          <th>Pts</th>
        </tr>
        </thead>
      <tbody id="standings">
          ${standings}
      </tbody>
    </table>
    
    </div>
    `;
}

function getAllScorers() {
  if ('caches' in window) {
    caches.match(URL_SCORERS).then((response) => {
      if (response) {
        response.json().then((data) => {
          showScorers(data);
        });
      }
    });
  }

  fetchAPI(URL_SCORERS)
    .then((data) => {
      showScorers(data);
    })
    .catch(error);
}

function showScorers(data) {
  let scorers = '';
  const scorerElement = document.getElementById('listScorers');
  const preLoad = document.querySelector('.preloader-background');
  preLoad.className += ' hidden';
  let no = 1;
  data.scorers.forEach((scorer) => {
    scorers += `
      <tr>
        <td class="center">${no++}</td>
        <td>${scorer.player.name}</td>
        <td><img src="https://crests.football-data.org/${scorer.team.id}.svg" width="30px" alt="badge" onerror="this.onerror=null;this.src='img/icon/icon-512x512.png'"/></td>
        <td><a href="./team.html?id=${scorer.team.id}">${scorer.team.name}</a></td>
        <td class="center">${scorer.numberOfGoals}</td>
      </tr>
      `;
  });

  scorerElement.innerHTML = `
    <div class="card hoverable" style="padding-left: 20px; padding-right: 20px; margin-top: 30px; margin-bottom: 30px;">

    <table class="striped">
      <thead>
        <tr>
          <th class="center">No</th>
          <th>Player Name</th>
          <th></th>
          <th>Team</th>
          <th>Goals</th>
        </tr>
      </thead>
      <tbody id="scorers">
        ${scorers}
      </tbody>
    </table>
    
    </div>
    `;
}

function getAllMatches() {
  if ('caches' in window) {
    caches.match(URL_MATCHES).then((response) => {
      if (response) {
        response.json().then((data) => {
          showMatches(data);
        });
      }
    });
  }

  fetchAPI(URL_MATCHES)
    .then((data) => {
      showMatches(data);
    })
    .catch(error);
}

function showMatches(data) {
  let matches = '';
  const matchElement = document.getElementById('listMatches');
  const preLoad = document.querySelector('.preloader-background');
  preLoad.className += ' hidden';

  data.matches.forEach((match) => {
    matches += `
      <tr class="tMatches">
          <td class="tMatches"><img src="https://crests.football-data.org/${match.homeTeam.id}.svg" width="30px" alt="badge" onerror="this.onerror=null;this.src='img/icon/icon-512x512.png'"/></td>
          <td class="tMatches"><a href="./team.html?id=${match.homeTeam.id}">${match.homeTeam.name}</a> (${match.score.fullTime.homeTeam})</td>
          <td class="tMatches"><img src="https://crests.football-data.org/${match.awayTeam.id}.svg" width="30px" alt="badge" onerror="this.onerror=null;this.src='img/icon/icon-512x512.png'"/></td>
          <td class="tMatches"><a href="./team.html?id=${match.awayTeam.id}">${match.awayTeam.name}</a> (${match.score.fullTime.awayTeam})</td>
      </tr>
      `;
  });

  matchElement.innerHTML = `
    <div class="card hoverable" style="padding-left: 20px; padding-right: 20px; margin-top: 30px;">
      <table class="striped responsive-table tMatches">
        <thead class="tMatches">
          <tr class="tMatches">
            <th class="tMatches"></th>
            <th class="tMatches">Home Team</th>
            <th class="tMatches"></th>
            <th class="tMatches">Away Team</th>
          </tr>
        </thead>
        <tbody id="matches" class="tMatches">
          ${matches}
        </tbody>
      </table>
    </div>
  `;
}

function getTeamById() {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    if ('caches' in window) {
      caches.match(URL_TEAMS + idParam).then((response) => {
        if (response) {
          response.json().then((data) => {
            showTeam(data);
            resolve(data);
          });
        }
      });
    }

    fetchAPI(URL_TEAMS + idParam)
      .then((data) => {
        showTeam(data);
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        let teamHTML = '';
        teamHTML = '<h3 class="center bold deep-purple-text text-darken-4" style="margin-top: 5em;">Sorry Page error, please refresh page.</h3>';
        document.getElementById('team-content').innerHTML = teamHTML;
      });
  });
}

function showTeam(data) {
  let teamHTML = '';
  teamHTML = `
    <div class="row" style="margin-top: 20px;">
      <div class="col s12 m6 l5">
        <h3 class="bold deep-purple-text text-darken-4 center">${data.name}</h3>
        <div class="valign-wrapper">
          <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="badge" style="width: 60%; margin: 0 auto;" onerror="this.onerror=null;this.src='img/icon/icon-512x512.png'"/>
        </div>
      </div>

      <div class="col s12 m6 l7">
        <div class="card hoverable" style="padding-left: 20px; padding-right: 20px; margin-top: 30px;">
          <table class="striped">
            <tr>
              <th>Name</th>
              <td>${data.name}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>${data.area.name}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>${data.address}</td>
            </tr>
            <tr>
              <th>Venue</th>
              <td>${data.venue}</td>
            </tr>
            <tr>
              <th>Club Colors</th>
              <td>${data.clubColors}</td>
            </tr>
            <tr>
              <th>Founded</th>
              <td>${data.founded}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    `;

  document.getElementById('team-content').innerHTML = teamHTML;
}

function getFavTeams() {
  getAllTeams().then((teams) => {
    let teamsHTML = '';
    teams.forEach((team) => {
      teamsHTML += `
      <div class="card hoverable deep-purple-text text-darken-4">
        <a class="right waves-effect waves-light btn-floating btn red" onclick="deleteTeamListener(${team.id})" style="margin: 0.5em;">
            <i class="material-icons">delete_forever</i>
        </a>
        <div class="card-content center-align bold">
        <br>
            <h4 class="bold">${team.name}</h4>
            <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="Logo Team" style="width: 35%;" onerror="this.onerror=null;this.src='img/icon/icon-512x512.png'"/>
            <h6 class="bold">${team.founded}</h6>
        </div>
                
      </div>
      `;
    });
    if (teams.length === 0) {
      teamsHTML += `
        <div class="card hoverable deep-purple-text text-darken-4" style="height: 100px; margin-top: 5em;">
            <h6 class="center bold" style="padding-top: 40px;">Your favorite team not found!</h6>
        </div>`;
    }
    document.getElementById('favorite-team').innerHTML = teamsHTML;
    const preLoad = document.querySelector('.preloader-background');
    preLoad.className += ' hidden';
  });
}
