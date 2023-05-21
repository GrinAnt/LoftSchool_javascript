import model from './model';
import pages from './pages';
import mainPage from './mainPage';

export default {
  handleEvents() {
    let log = document.querySelector('.page-login-button');

    log.addEventListener('click', async () => {
      await model.login();
      await model.init();
      pages.openPage('main');
      await mainPage.getNextPhoto();
    });
  },
};
