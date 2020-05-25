const shopRepository = require('../repository/shopRepository');

module.exports = {
  registerIfNotAlreadyRegistered: async (shop) => {
    const foundShop = await shopRepository.getByUrl(shop);

    if (!foundShop) {
      return await shopRepository.add(shop);
    }

    return foundShop;
  },
  registerNewShop: (shop) => {
    return shopRepository.add(shop);
  },
  fetchByUrl: (shop) => {
    return shopRepository.getByUrl(shop);
  }
}