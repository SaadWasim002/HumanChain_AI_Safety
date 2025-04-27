import Incident from "../models/Incident.js";

// GET /incidents
export const getAllIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find();
        res.json(incidents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// GET /incidents/:id
export const getIncidentById = async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);
        if(!incident) {
            return res.status(404).json({ message: "Incident not found" });
        }
        res.status(200).json(incident);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// POST /incidents
export const createIncident = async (req, res) => {
    const { title, description, severity } = req.body;
    const allowed = ["Low", "Medium", "High"];

    if(!title || !description || !severity) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if(!allowed.includes(severity)) {
        return res.status(400).json({ message: "Severity must be Low, Medium, or High" });
    }

    try {
        const incident = new Incident({ title, description, severity });
        const saved = await incident.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// DELETE /incidents/:id
export const deleteIncident = async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);
        if(!incident) {
            return res.status(404).json({ message: "Incident not found" });
        }
        await incident.deleteOne();
        res.status(200).json({ message: "Incident deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

