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
    let itemElements = document.querySelectorAll('.page');

    itemElements.forEach((item) => {
      if (!item.classList.contains('hidden')) {
        item.classList.add('hidden');
      }
    });

    currentPage = el;
    currentPage.classList.remove('hidden');
  },
};
