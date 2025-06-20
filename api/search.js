const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }

  try {
    const url = `https://almaaref.org/maarefsearch/index.php?query=${encodeURIComponent(query)}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const results = [];

    $('ul > li > a').each((_, el) => {
      results.push({
        title: $(el).text(),
        url: $(el).attr('href'),
      });
    });

    res.status(200).json({ results });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
};
