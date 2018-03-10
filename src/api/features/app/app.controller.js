const DB = require('../../db/models');
const { ContentText, Language } = DB;

/**
 * For site display purpose
 */
exports.setLanguage = async (req, res) => {
  if (req.body.culture) {
    res.cookie('lang', req.body.culture);
  }
  res.redirect('/');
};

exports.get = async (req, res) => {
  const languages = await Language.findAll({});
  const language = languages.find(
    l => l.locale === (req.cookies.lang || 'en-US')
  );

  ContentText.findAll({
    include: [
      {
        model: DB.Content
      }
    ],
    where: {
      languageid: language.id
    }
  })
    .then(list => {
      const content = {};

      list.forEach(item => {
        content[item.Content.key] = item.text;
      });

      const appData = {
        cultures: languages.map(l => ({
          value: l.locale,
          text: `${l.description} - (${l.locale})`,
          current: (req.cookies.lang || 'en-US') === l.locale
        })),
        content
      };
      res.json(appData);
    })
    .catch(err => res.status(400).send(err));
};
