const DB = require('../../db/models');
const { ContentText, Language } = DB;

/**
 * For site display purpose
 */
const getContent = async req => {
  const languages = await Language.findAll({});
  const language = languages.find(
    l => l.locale === (req.cookies.lang || 'en-US')
  );
  return ContentText.findAll({
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

      return {
        cultures: languages.map(l => ({
          value: l.locale,
          text: `${l.description} - (${l.locale})`,
          current: (req.cookies.lang || 'en-US') === l.locale
        })),
        content
      };
    })
    .catch(err => Promise.reject(err));
};

exports.setLanguage = async (req, res) => {
  if (req.body.culture) {
    res.cookie('lang', req.body.culture);
  }
  res.redirect('/');
};

exports.get = (req, res) => {
  getContent(req).then(appData => res.json(appData));
};

exports.content = getContent;
