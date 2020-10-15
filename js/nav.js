document.addEventListener('DOMContentLoaded', () => {
  // Activate sidebar nav
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll('.topnav, .sidenav').forEach((elm) => {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document.querySelectorAll('.sidenav a, .topnav a').forEach((elm) => {
          elm.addEventListener('click', (event) => {
            // Tutup sidenav
            const sidenav = document.querySelector('.sidenav');
            M.Sidenav.getInstance(sidenav).close();

            // Muat konten halaman yang dipanggil
            page = event.target.getAttribute('href').substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open('GET', 'nav.html', true);
    xhttp.send();
  }

  // Load page content
  let page = window.location.hash.substr(1);
  if (page === '') page = 'standings';
  loadPage(page);

  function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const content = document.querySelector('#body-content');
        if (page === 'standings') {
          getAllStandings();
        } else if (page === 'scorers') {
          getAllScorers();
        } else if (page === 'matches') {
          getAllMatches();
        } else if (page === 'favorite') {
          getFavTeams();
        }
        // Active link
        const menuItem = document.querySelectorAll('li');
        for (let i = 0; i < menuItem.length; i++) {
          if (menuItem[i].firstChild.id === page) {
            menuItem[i].className += 'active';
          } else if (menuItem[i].firstChild.id !== page) {
            menuItem[i].classList.remove('active');
          }
        }
        // ---
        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status === 404) {
          content.innerHTML = '<h3>Halaman tidak ditemukan</h3>';
        } else {
          content.innerHTML = '<h3>Ups... Halaman tidak dapat diakses.</h3>';
        }
      }
    };
    xhttp.open('GET', `pages/${page}.html`, true);
    xhttp.send();
  }
});
