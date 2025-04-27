import express from 'express';
import { getAllIncidents, getIncidentById , createIncident , deleteIncident } from '../controllers/incidentController.js';

const router = express.Router();

router.get('/incidents', getAllIncidents);
router.get('/incidents/:id', getIncidentById);
router.post('/incidents', createIncident);
router.delete('/incidents/:id', deleteIncident);

export default router;
