/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ContentTexts', [
      // English
      { languageid: 1, contentid: 1, text: 'VueNode' },
      { languageid: 1, contentid: 2, text: 'A Single Page Application built using Vue.Js and Nodejs' },
      { languageid: 1, contentid: 3, text: 'https://github.com/asadsahi/vuenode-fullstack' },
      { languageid: 1, contentid: 4, text: 'Home' },
      { languageid: 1, contentid: 5, text: 'About' },
      { languageid: 1, contentid: 6, text: 'Login' },
      { languageid: 1, contentid: 7, text: 'Logout' },
      { languageid: 1, contentid: 8, text: 'Register' },
      { languageid: 1, contentid: 9, text: 'Admin' },
      { languageid: 1, contentid: 10, text: 'Examples' },
      // French
      { languageid: 2, contentid: 1, text: 'VueNode' },
      { languageid: 2, contentid: 2, text: 'Application d\'une seule page utilisant node et vue.js' },
      { languageid: 2, contentid: 3, text: 'https://github.com/asadsahi/vuenode-fullstack' },
      { languageid: 2, contentid: 4, text: 'Accueil' },
      { languageid: 2, contentid: 5, text: 'Sur' },
      { languageid: 2, contentid: 6, text: 'S\'identifier' },
      { languageid: 2, contentid: 7, text: 'Connectez - Out' },
      { languageid: 2, contentid: 8, text: 'registre' },
      { languageid: 2, contentid: 9, text: 'Admin' },
      { languageid: 2, contentid: 10, text: 'Traduire' },
    ], {}).catch(e => Promise.resolve());
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ContentTexts', null, {}),
};
