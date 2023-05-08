const pagesMap = {
  login: '.page-login',
  main: '.page-main',
  profile: '.page-profile',
};

let currentPage = null;

export default {
  openPage(name) {
    let select = pagesMap[name];
    let el = document.querySelector(select);

    currentPage?.classList.add('hidden');
    currentPage = el;
    currentPage.classList.remove('hidden');
  },
};
