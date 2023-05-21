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

    headerPhotoComp.style.backgroundImage = `url('${friend.photo_50}')`;
    headerNameComp.innerText = `${friend.first_name ?? ''} ${friend.last_name ?? ''}`;
    photoComp.style.backgroundImage = `url(${url})`;
  },

  handleEvents() {
    let startFrom;

    document.querySelector('.component-photo').addEventListener('touchstart', (e) => {
      e.preventDefault();
      startFrom = { y: e.changedTouches[0].pageY };
    });
    document.querySelector('.component-photo').addEventListener('touchend', async (e) => {
      // e.preventDefault();
      let direction = e.changedTouches[0].pageY - startFrom.y;
      if (direction < 0) {
        await this.getNextPhoto();
      }
    });
  },
};
