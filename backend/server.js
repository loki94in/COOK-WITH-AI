const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock recipe data moved from the mobile app to the server
const mockRecipeData = {
  id: "rec_mock_123",
  title: "Traditional Dum Biryani (From Local API)",
  source_url: "https://youtube.com/watch?v=mock",
  prep_time: 45,
  servings: 4,
  confidence_score: 0.94,
  ingredients: [
    { name: "Chicken", amount: "500g", unit: "g" },
    { name: "Basmati Rice", amount: "2 cups", unit: "cups" },
    { name: "Yogurt", amount: "1 cup", unit: "cup" },
    { name: "Biryani Masala", amount: "2 tbsp", unit: "tbsp" },
    { name: "Onions", amount: "2 large", unit: "whole" }
  ],
  steps: [
    { instruction: 'Soak rice for 30 minutes in cold water', timer: 1800 },
    { instruction: 'Marinate chicken with yogurt and spices for 1 hour', timer: 3600 },
    { instruction: 'Layer rice over chicken and cook on low heat (Dum)', timer: 2400 }
  ]
};

// Extraction endpoint
app.post('/v1/extract', (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: "Missing YouTube URL" });
  }

  console.log(`[API] Received extraction request for: ${url}`);
  
  // Simulate cloud processing delay
  setTimeout(() => {
    res.json({
      success: true,
      data: mockRecipeData
    });
  }, 1500);
});

app.listen(PORT, () => {
  console.log(`Smart Cooking Assistant API is running on http://localhost:${PORT}`);
});
