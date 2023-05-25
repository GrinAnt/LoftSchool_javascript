import profilePage from './profilePage';
import pages from './pages';
import model from './model';
import('./styles.css');
import mainPage from './mainPage';
import loginPage from './loginPage';

pages.openPage('login');
loginPage.handleEvents();
mainPage.handleEvents();

profilePage.handleEvents();
