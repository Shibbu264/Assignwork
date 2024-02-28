import express from 'express';
import mongoose from 'mongoose';
import { insightSchema } from './mongoose.js';
import cors from 'cors';
const app = express();
app.use(express.json())
app.use(cors())
const PORT = 3000;


mongoose.connect('mongodb+srv://Shivu264:Tshirtstrip123@cluster0.ormdwik.mongodb.net/test-1')
  .then(() => {
    console.log('Connected to MongoDB');

    const Insight = mongoose.model('insights', insightSchema);

    app.post('/api/getpiedata', async (req, res) => {
      try {
        const aggregatedData = await Insight.aggregate([
          {
            $group: {
              _id: `$${req.body.filter}`,
              count: { $sum: 1 }
            }
          },
          {
            $match: { _id: { $ne: "" } } 
          },
          {
            $sort: { count: -1 }
          }
        ]);
    
        res.status(200).json(aggregatedData);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
    




    app.get('/api/insights', async (req, res) => {
      try {
        const data = await Insight.find();
        console.log(data);
        res.json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.post('/api/insightfilter', async (req, res) => {
      try {
        const data = await Insight.find(req.body);
    
        res.json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });





    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });











  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
