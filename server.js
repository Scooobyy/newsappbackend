const express = require('express');
const cors = require('cors');
const axios = require('axios');
// Load environment variables from the .env file
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS
const corsOptions = {
  origin: 'https://58f8aca4.dailyindiatimes.pages.dev/', // Replace with your frontend domain
};
app.use(cors(corsOptions));

// API route to fetch news from NewsAPI
app.get('/api/news', async (req, res) => {
  const { q, page, pageSize } = req.query;

  const apiKey = process.env.NEWS_API_KEY; // Access the API key from environment variables

  const url = `https://newsapi.org/v2/everything?q=${q}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const articles = response.data.articles;
    res.json({ articles, totalResults: response.data.totalResults });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
