let PERM_FRIENDS = 1;
let PERM_PHOTOS = 1;

export default {
  getRandomElement(array) {
    let randomIndex = Math.round(Math.random() * (array.length - 1));
    return array[randomIndex];
  },
  async getNextPhoto() {
    let friend = this.getRandomElement(this.friends.items);
    let photos = await this.getFriendPhotos(friend.id);
    let photo = this.getRandomElement(photos.items);
    let size = thise.findSize(photo);

    return { friend, id: photo.id, url: size.url };
  },

  findSize(photo) {
    const photSize = photo.sizes.find((size) => size.width >= 360);

    return photSize;
  },

  login() {
    return new Promise((resolve, reject) => {
      VK.init({
        apiId: 51643234,
      });
      VK.Auth.login((response) => {
        if (response.session) {
          resolve(response);
        } else {
          console.log(response);
          reject(response);
        }
      }, PERM_FRIENDS | PERM_PHOTOS);
    });
  },

  async init() {
    this.photoCache = {};
    this.friends = await this.getFriends();
  },

  callApi(method, params) {
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

    return this.callApi('friends.get', params);
  },

  getPhotos(owner) {
    let params = { owner_id: owner };

    return this.callApi('photos.getAll', params);
  },

  photoCache: {},

  async getFriendPhotos(id) {
    const photos = this.photoCache[id];

    if (photos) {
      return photos;
    }

    photos = await this.getPhotos(id);

    this.photoCache[id] = photos;

    return photos;
  },
};
