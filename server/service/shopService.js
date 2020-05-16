const shopRepository = require('../repository/shopRepository');

module.exports = {
  registerNewShop: (shop) => {
    return shopRepository.add(shop);
  },
  fetchByUrl: (shop) => {
    return shopRepository.getByUrl(shop);
  }
}