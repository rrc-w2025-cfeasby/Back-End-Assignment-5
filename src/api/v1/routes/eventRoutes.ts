import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { eventSchemas } from '../validation/eventSchemas';
import { 
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
} from '../controllers/eventController';

const router: Router = Router();

// POST /api/v1/events - Create an event
router.post(
    "/events",
    validateRequest(eventSchemas.create),
    createEvent
);

// GET /api/v1/events - Get all events
router.get("/events", getAllEvents);

// GET /api/v1/events/:id - Get event by Id
router.get("/events/:id", getEventById);

// PUT /api/v1/events/:id - Update event by Id
router.put("/events/:id", updateEvent);

// DELETE /api/v1/events/:id - Delete event by Id
router.delete("/events/:id", deleteEvent);

export default router;