import { randomUUID } from 'crypto';
import { Event } from '../models/eventModel';
import { firestoreRepository } from '../repositories/firestoreRepository';

/**
 * Create Event Service Function
 * @param data - Event data excluding id, createdAt, and updatedAt
 * @returns Created Event
 */
export async function createEventService(data: Omit<Event, "id" | "createdAt" | "updatedAt">): Promise<Event> {
    const event_id: string = randomUUID();
    const timestamp: string = new Date().toISOString();

    const event: Event = {
        id: event_id,
        ...data,
        createdAt: timestamp,
        updatedAt: timestamp
    };

    await firestoreRepository.createDocument('events', event, event_id);
    
    return event;
};

/**
 * Get All Events Service Function
 * @returns events - Array of Events
 */
export async function getAllEventsService(): Promise<Event[]> {
    const snapshot: FirebaseFirestore.QuerySnapshot = await firestoreRepository.getDocuments('events');

    const events: Event[] = snapshot.docs.map((doc) => {
        return doc.data() as Event        
    });

    return events;
};

/**
 * Get Event By Id Service Function
 * @param id - string Id of the event
 * @returns Event | null
 */
export async function getEventByIdService(id: string): Promise<Event | null> {
    const doc: FirebaseFirestore.DocumentSnapshot | null = await firestoreRepository.getDocumentById('events', id);

    if(!doc){
        throw new Error(`Event with id ${id} not found`);
    }

    return doc.data() as Event;
};

/**
 * Update event service function - updates an existing event
 * @param id - string Id of the event to be updated
 * @param data - Partial<Event> data to update
 * @returns Event - Updated event
 */
export async function updateEventService(id: string, data: Partial<Event>): Promise<Event> {
    const existingDoc: FirebaseFirestore.DocumentSnapshot | null = await firestoreRepository.getDocumentById('events', id);

    if(!existingDoc){
        throw new Error(`Event with id ${id} not found`);
    };

    const existing: Event = existingDoc.data() as Event;

    const updatedEvent: Event = {
        ...existing,
        ...data,
        updatedAt: new Date().toISOString()
    };

    await firestoreRepository.updateDocument<Event>('events', id, updatedEvent);

    return updatedEvent;
};

/**
 * Delete event service function by Id 
 * @param id - string Id of the event to be deleted
 * @returns Object containing deleted event id
 */
export async function deleteEventService(id: string): Promise<{id: string}> {
    const existingDoc: FirebaseFirestore.DocumentSnapshot | null = await firestoreRepository.getDocumentById('events', id);

    if(!existingDoc){
        throw new Error(`Event with id ${id} not found`);
    };

    await firestoreRepository.deleteDocument('events', id);

    return { id };
};

// Export the service object
export const eventService: {
    createEventService: typeof createEventService;
    getAllEventsService: typeof getAllEventsService;
    getEventByIdService: typeof getEventByIdService;
    updateEventService: typeof updateEventService;
    deleteEventService: typeof deleteEventService;
} = {
    createEventService,
    getAllEventsService,
    getEventByIdService,
    updateEventService,
    deleteEventService
};