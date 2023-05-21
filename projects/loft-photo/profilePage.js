import model from './model';
import mainPage from './mainPage';
import pages from './pages';

export default {
  async setUser(user) {
    let photoComp = document.querySelector('.component-user-info-photo');
    let nameComp = document.querySelector('.component-user-info-name');
    let photosComp = document.querySelector('.component-user-photos');
    let photos = await model.getPhotos(user.id);

    this.user = user;

    photoComp.style.backgroundImage = `url('${user.photo_100}')`;
    nameComp.innerText = `${user.first_name ?? ''} ${user.last_name ?? ''}`;
    photosComp.innerHTML = '';

    for (let photo of photos.items) {
      let size = model.findSize(photo);
      let element = document.createElement('div');

      element.classList.add('component-user-photo');
      element.dataset.id = photo.id;
      element.style.backgroundImage = `url(${size.url})`;

      photosComp.append(element);
    }
  },

  handleEvents() {
    let usertPhoto = document.querySelector('.component-user-photos');

    usertPhoto.addEventListener('click', async (e) => {
      if (e.target.classList.contains('component-user-photo')) {
        let photoId = e.target.dataset.id;
        let friendsPhotos = await model.getPhotos(this.user.id);
        let photo = friendsPhotos.items.find((photo) => photo.id == photoId);

        let size = model.findSize(photo);

        mainPage.setFriendAndPhoto(this.user, parseInt(photoId), size.url);
        pages.openPage('main');
      }
    });

    let back = document.querySelector('.page-profile-back');

    back.addEventListener('click', () => {
      pages.openPage('main');
    });

    let exitProfile = document.querySelector('.page-profile-exit');

    exitProfile.addEventListener('click', async () => {
      await model.logout();
      pages.openPage('login');
    });
  },
};
