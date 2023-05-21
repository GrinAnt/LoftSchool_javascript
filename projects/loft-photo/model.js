let PERM_FRIENDS = 2;
let PERM_PHOTOS = 4;

export default {
  getRandomElement(array) {
    let randomIndex = Math.round(Math.random() * (array.length - 1));
    return array[randomIndex];
  },

  async getNextPhoto() {
    let friend = this.getRandomElement(this.friends.items);
    let photos = await this.getFriendPhotos(friend.id);
    let photo = this.getRandomElement(photos.items);
    let size = this.findSize(photo);

    return { friend, id: photo.id, url: size.url };
  },

  findSize(photo) {
    const photSize = photo.sizes.find((size) => size.width >= 360);

    return photSize;
  },

  login() {
    return new Promise((resolve, reject) => {
      VK.init({
        apiId: 51645561,
      });
      VK.Auth.login((response) => {
        if (response.session) {
          resolve(response);
        } else {
          reject(response);
        }
      }, PERM_FRIENDS | PERM_PHOTOS);
    });
  },

  async init() {
    this.photoCache = {};
    this.friends = await this.getFriends();
  },

  callAPI(method, params) {
    params.v = '5.131';

    return new Promise((resolve, reject) => {
      VK.api(method, params, (response) => {
        if (response.error) {
          reject(new Error(response.error.error_msg));
        } else {
          resolve(response.response);
        }
      });
    });
  },

  getFriends() {
    const params = {
      fields: ['photo_50', 'photo_100'],
    };

    return this.callAPI('friends.get', params);
  },

  getPhotos(user) {
    let params = { owner_id: user };

    return this.callAPI('photos.getAll', params);
  },

  // photoCache: {},

  async getFriendPhotos(id) {
    let photos = this.photoCache[id];
    if (photos) {
      return photos;
    }

    photos = await this.getPhotos(id);
    this.photoCache[id] = photos;
    return photos;
  },
};
