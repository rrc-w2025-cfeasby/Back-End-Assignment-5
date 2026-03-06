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
/**
 * @openapi
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateEvent"
 *     responses:
 *       201:
 *         description: Event created
 *       400:
 *         description: Validation error
 */
router.post(
    "/events",
    validateRequest(eventSchemas.create),
    createEvent
);

// GET /api/v1/events - Get all events
/**
 * @openapi
 * /events:
 *   get:
 *     summary: Retrieve all events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: A list of events
 */
router.get("/events", getAllEvents);

// GET /api/v1/events/:id - Get event by Id
/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Retrieve a single event by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event found
 *       404:
 *         description: Event not found
 */
router.get("/events/:id", getEventById);

// PUT /api/v1/events/:id - Update event by Id
/**
 * @openapi
 * /events/{id}:
 *   put:
 *     summary: Update an event by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event updated
 *       404:
 *         description: Event not found
 */
router.put("/events/:id", updateEvent);

// DELETE /api/v1/events/:id - Delete event by Id
/**
 * @openapi
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Event deleted
 *       404:
 *         description: Event not found
 */
router.delete("/events/:id", deleteEvent);

export default router;