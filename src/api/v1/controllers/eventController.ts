import { Request, Response, NextFunction } from "express";
import { eventService } from "../services/eventService";
import { successResponse } from "../models/responseModel";
import { Event } from "../models/eventModel";

/**
 * Interface for request params containing event Id
 */
interface idParam {
  id: string;
};

/**
 * Create event controller function - handles creating a new event
 * 
 * @param req - Express Request object containing event data in body
 * @param res - Express Response object to send response
 * @param next - Express NextFunction for error handling
 */
export async function createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try{
    const event: Event = await eventService.createEventService(req.body);
    res.status(201).json(successResponse(event, "Event created successfully"));
  }catch(error){
    next(error);
  }
};

/**
 * Get all events controller function - handles retrieving all events
 * 
 * @param req - Express Request object containing event data in body
 * @param res - Express Response object to send response
 * @param next - Express NextFunction for error handling
 */
export async function getAllEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
  try{
    const events: Event[] = await eventService.getAllEventsService();
    res.status(200).json(successResponse(events, "Events retrieved"));
  }catch(error){
    next(error);
  }
};

/**
 * Get event by Id controller function - handles retrieving a single event by its Id
 * 
 * @param req - Express Request object containing event data in body
 * @param res - Express Response object to send response
 * @param next - Express NextFunction for error handling 
 */
export async function getEventById(req: Request<idParam>, res: Response, next: NextFunction): Promise<void> {
  try{
    const event: Event | null = await eventService.getEventByIdService(req.params.id);
    res.status(200).json(successResponse(event, "Event retrieved"));
  }catch(error){
    next(error);
  }
};

/**
 * Update event controller function - handles updating an existing event by its Id
 * 
 * @param req - Express Request object containing event data in body
 * @param res - Express Response object to send response
 * @param next - Express NextFunction for error handling 
 */
export async function updateEvent(req: Request<idParam>, res: Response, next: NextFunction): Promise<void> {
  try{
    const updated: Event = await eventService.updateEventService(req.params.id, req.body);
    res.status(200).json(successResponse(updated, "Event updated successfully"));
  }catch(error){
    next(error);
  }
};

/**
 * Delete event controller function - handles deleting an existing event by its Id
 * 
 * @param req - Express Request object containing event data in body
 * @param res - Express Response object to send response
 * @param next - Express NextFunction for error handling
 */
export async function deleteEvent(req: Request<idParam>, res: Response, next: NextFunction): Promise<void> {
  try{
    const result: {id: string} = await eventService.deleteEventService(req.params.id);
    res.status(200).json(successResponse(result, "Event deleted successfully"));
  }catch(error){
    next(error);
  }
};

/**
 * Export the controller object containing all controller functions
 */
export const eventController: {
  createEvent: typeof createEvent;
  getAllEvents: typeof getAllEvents;
  getEventById: typeof getEventById;
  updateEvent: typeof updateEvent;
  deleteEvent: typeof deleteEvent;
} = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
};