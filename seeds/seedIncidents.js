import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Incident from '../models/Incident.js';

dotenv.config();

const sampleIncidents = [
  {
    title: 'Autonomous Drone Misfire',
    description: 'Delivery drone dropped package unexpectedly due to AI flight-path glitch.',
    severity: 'Medium'
  },
  {
    title: 'Biased Recruitment AI',
    description: 'Hiring model unfairly rejected candidates from certain demographic groups.',
    severity: 'High'
  },
  {
    title: 'Chatbot Privacy Leak',
    description: 'AI chatbot inadvertently revealed private user data in response to prompts.',
    severity: 'Low'
  }
];

const seed = async () => {
  try {
    await connectDB();
    await Incident.deleteMany({});
    console.log('Cleared existing incidents');
    const created = await Incident.insertMany(sampleIncidents);
    console.log(`Inserted ${created.length} sample incidents`);
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    process.exit();
  }
};

seed();
