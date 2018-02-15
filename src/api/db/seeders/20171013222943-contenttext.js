/* eslint-disable */
const Model = require('../models').ContentText;

module.exports = {
  up: (queryInterface, Sequelize) => Model.count().then((count) => {
    if (count < 1) {
      return queryInterface.bulkInsert('ContentTexts', [
        // English
        { languageid: 1, contentid: 1, text: 'Vue+Node' },
        { languageid: 1, contentid: 2, text: 'Home' },
        { languageid: 1, contentid: 3, text: 'About' },
        { languageid: 1, contentid: 4, text: 'Login' },
        { languageid: 1, contentid: 5, text: 'Logout' },
        { languageid: 1, contentid: 6, text: 'Register' },
        { languageid: 1, contentid: 7, text: 'Admin' },
        { languageid: 1, contentid: 8, text: 'Examples' },
        // French
        { languageid: 2, contentid: 1, text: 'Vue+Node' },
        { languageid: 2, contentid: 2, text: 'Accueil' },
        { languageid: 2, contentid: 3, text: 'Sur' },
        { languageid: 2, contentid: 4, text: 'S\'identifier' },
        { languageid: 2, contentid: 5, text: 'Connectez - Out' },
        { languageid: 2, contentid: 6, text: 'registre' },
        { languageid: 2, contentid: 7, text: 'Admin' },
        { languageid: 2, contentid: 8, text: 'Traduire' },
      ], {});
    }
  }),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ContentTexts', null, {}),
};
