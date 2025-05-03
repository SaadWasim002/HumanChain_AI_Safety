import Incident from "../models/Incident.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// GET /incidents
export const getAllIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find();
        res.status(200).json(
            new ApiResponse(200 , incidents , "All incidents retrieved")
        );
    } catch (err) {
        throw new ApiError(500 , `Server Error : ${err}`);
    }
};

// GET /incidents/:id
export const getIncidentById = async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);
        if(!incident) {
            return res.status(404).json(
                new ApiResponse(404 , {} , "Incident not found" , false)
            )
        }
        res.status(200).json(
            new ApiResponse(200 , incident , "Incident retrieved successfully")
        );
    } catch (err) {
        throw new ApiError(500 , `Server Error : ${err}`);
    }
};

// POST /incidents
export const createIncident = async (req, res) => {
    const { title, description, severity } = req.body;
    const allowed = ["Low", "Medium", "High"];

    if(!title || !description || !severity) {
        return res.status(400).json(
            new ApiResponse(400 , {} , "All fields are required" , false)
        )
    }

    if(!allowed.includes(severity)) {
        return res.status(400).json(
            new ApiResponse(400 , {} , "Severity must be Low, Medium, or High" , false)
        )
    }

    try {
        const createdIncident = await Incident.create({
            title,
            description,
            severity
        })
        res.status(201).json(
            new ApiResponse(201 , createdIncident , "Incident created successfully")
        );
    } catch (err) {
        throw new ApiError(500 , `Server Error : ${err}`);
    }
};

// DELETE /incidents/:id
export const deleteIncident = async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);
        if(!incident) {
            return res.status(404).json(
                new ApiResponse(404 , {} , "Incident not found" , false)
            )
        }
        await incident.deleteOne();
        res.status(200).json(
            new ApiResponse(200 , {} , "Incident deleted successfully")
        )
    } catch (err) {
        throw new ApiError(500 , `Server Error : ${err}`);
    }
};

