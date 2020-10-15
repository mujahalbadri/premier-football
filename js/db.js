const dbPromised = idb.open('football', 1, (upgradeDb) => {
  const teamObjectStore = upgradeDb.createObjectStore('teams', {
    keyPath: 'id',
  });
  teamObjectStore.createIndex('name', 'name', { unique: false });
});

function insertTeam(team) {
  dbPromised
    .then((db) => {
      const tx = db.transaction('teams', 'readwrite');
      const store = tx.objectStore('teams');
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(() => {
      M.toast({ html: `${team.name} berhasil disimpan!` });
      if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification('Your team has been added');
        });
      } else {
        console.error('Fitur notifikasi tidak diijinkan.');
      }
      console.log('Team berhasil disimpan');
    }).catch((err) => {
      console.error('Team gagal disimpan', err);
    });
}

function getAllTeams() {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction('teams', 'readonly');
        const store = tx.objectStore('teams');
        return store.getAll();
      })
      .then((teams) => {
        resolve(teams);
      });
  });
}

function deleteTeam(teamId) {
  dbPromised
    .then((db) => {
      const tx = db.transaction('teams', 'readwrite');
      const store = tx.objectStore('teams');
      store.delete(teamId);
      return tx.complete;
    }).then(() => {
      M.toast({ html: 'Team has been deleted!' });
      if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification('Your team has been deleted');
        });
      } else {
        console.error('Fitur notifikasi tidak diijinkan.');
      }
      getFavTeams();
    }).catch((err) => {
      console.error('Error: ', err);
    });
}

const deleteTeamListener = (teamId) => {
  const confirmation = confirm('Are you want to delete this team?');
  if (confirmation === true) {
    deleteTeam(teamId);
    console.log(`Team ID : ${teamId} has been deleted`);
  }
};
