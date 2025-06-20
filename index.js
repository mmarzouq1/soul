const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).send({ error: 'Query is required' });

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

    res.json({ results });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch results' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
console.log("Ready!") 
