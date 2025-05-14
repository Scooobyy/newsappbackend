const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS (allow all origins or specify a specific origin in production)
app.use(cors({ origin: 'https://58f8aca4.dailyindiatimes.pages.dev' }));


// API route to fetch news from NewsAPI
app.get('/api/news', async (req, res) => {
  // Destructure query parameters with default values
  const { q = 'latest', page = 1, pageSize = 10 } = req.query;

  const apiKey = '3f906f326f62466b937ed1e947ef6e54'; // Replace with your NewsAPI key
  const url = `https://newsapi.org/v2/everything?q=${q}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const articles = response.data.articles;
    
    // Respond with the articles and the total results
    res.json({ articles, totalResults: response.data.totalResults });
  } catch (error) {
    console.error('Error fetching news:', error);
    // Return a 500 error with a message if the API call fails
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
