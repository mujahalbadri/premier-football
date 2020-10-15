// Periksa service worker
if (!('serviceWorker' in navigator)) {
  console.log('Service worker tidak didukung browser ini.');
} else {
  registerServiceWorker();
}
// Register service worker
function registerServiceWorker() {
  return navigator.serviceWorker.register('service-worker.js')
    .then((registration) => {
      console.log('Registrasi service worker berhasil.');
      return registration;
    })
    .catch((err) => {
      console.error('Registrasi service worker gagal.', err);
    });
}

// REQUEST API UNTUK PERTAMA KALI
document.addEventListener('DOMContentLoaded', () => {
  const preLoad = document.querySelector('.preloader-background');
  preLoad.className += ' hidden';

  const toolTip = document.querySelectorAll('.tooltipped');
  M.Tooltip.init(toolTip);

  const fav = document.getElementById('btnfavorite');

  const getTeam = getTeamById();

  fav.onclick = function () {
    console.log('Tombol FAB di klik.');
    getTeam.then((team) => {
      insertTeam(team);
    });
  };
});
