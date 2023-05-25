import profilePage from './profilePage';
import pages from './pages';
import model from './model';

export default {
  async getNextPhoto() {
    let { friend, id, url } = await model.getNextPhoto();
    this.setFriendAndPhoto(friend, id, url);
  },

  setFriendAndPhoto(friend, id, url) {
    let photoComp = document.querySelector('.component-photo');
    let headerPhotoComp = document.querySelector('.component-header-photo');
    let headerNameComp = document.querySelector('.component-header-name');
    let compFooterPhoto = document.querySelector('.component-footer-photo');

    this.friend = friend;

    headerPhotoComp.style.backgroundImage = `url('${friend.photo_50}')`;
    headerNameComp.innerText = `${friend.first_name ?? ''} ${friend.last_name ?? ''}`;
    photoComp.style.backgroundImage = `url(${url})`;
    compFooterPhoto.style.backgroundImage = `url('${model.me.photo_50}')`;
  },

  handleEvents() {
    let startFrom;

    let compPhoto = document.querySelector('.component-photo');

    compPhoto.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startFrom = { y: e.changedTouches[0].pageY };
    });

    compPhoto.addEventListener('touchend', async (e) => {
      e.preventDefault();
      let direction = e.changedTouches[0].pageY - startFrom.y;
      if (direction < 0) {
        await this.getNextPhoto();
      }
    });

    let headerLink = document.querySelector('.component-header-profile-link');

    headerLink.addEventListener('click', async () => {
      await profilePage.setUser(this.friend);
      pages.openPage('profile');
    });

    let profileLink = document.querySelector('.component-footer-container-profile-link');

    profileLink.addEventListener('click', async () => {
      await profilePage.setUser(model.me);
      pages.openPage('profile');
    });
  },
};
