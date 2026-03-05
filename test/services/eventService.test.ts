import { 
    createEventService,
    getAllEventsService,
    getEventByIdService,
    updateEventService,
    deleteEventService
 } from "../../src/api/v1/services/eventService";
import { firestoreRepository } from "../../src/api/v1/repositories/firestoreRepository";
import { Event } from "../../src/api/v1/models/eventModel";

/**
 * Event Service Tests
 *
 * Tests the functionality of the event service layer.
 */
describe('Event Service Tests', () => {
    // Test should create event
    test("should create event", async () => {
        // Arrange
        jest.spyOn(firestoreRepository, 'createDocument')
            .mockResolvedValue("123");

        const data: Omit<Event, "id" | "createdAt" | "updatedAt"> = {
            name: "Test Event",
            date: "2027-01-01T00:00:00.000Z",
            capacity: 100,
            registrationCount: 0,
            status: "active",
            category: "general"
        };

        // Act
        const result: Event = await createEventService(data);

        // Assert
        expect(result.id).toBeDefined();
        expect(result.name).toBe("Test Event");
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    });

    // Test should get all events
    test("should get all events", async () => {
        // Arrange
        const mockDocs: any[] = [
            { data: () => ({ id: "1", name: "Event 1" }) },
            { data: () => ({ id: "2", name: "Event 2" }) }
        ];

        jest.spyOn(firestoreRepository, 'getDocuments')
            .mockResolvedValue({ docs: mockDocs } as any);

        // Act
        const result: Event[] = await getAllEventsService();

        // Assert
        expect(result.length).toBe(2);
        expect(result[0].name).toBe("Event 1");
    });

    // Test should return event when found by id
    test("should return event when found by id", async () => {
        // Arrange
        const mockEvent = { id: "123", name: "Test Event" };
        const mockDoc = { data: () => mockEvent };

        jest.spyOn(firestoreRepository, 'getDocumentById')
            .mockResolvedValue(mockDoc as any);

        // Act
        const result: Event | null = await getEventByIdService("123");

        // Assert
        expect(result).toEqual(mockEvent);
    });

    // Test should update event when found by id
    test("should update event when found by id", async () => {
        // Arrange
        const existingEvent: Event = {
            id: "123",
            name: "Old Name",
            date: "2027-01-01T00:00:00.000Z",
            capacity: 100,
            registrationCount: 0,
            status: "active",
            category: "general",
            createdAt: "2027-01-01T00:00:00.000Z",
            updatedAt: "2027-01-01T00:00:00.000Z"
        };

        const mockDoc: { data: () => Event } = { data: () => existingEvent };

        jest.spyOn(firestoreRepository, 'getDocumentById')
            .mockResolvedValue(mockDoc as any);

        jest.spyOn(firestoreRepository, 'updateDocument')
            .mockResolvedValue(undefined);

        // Act
        const result: Event = await updateEventService("123", { name: "New Name" });

        // Assert
        expect(result.id).toBe("123");
        expect(result.name).toBe("New Name");
        expect(result.updatedAt).toBeDefined();      
    });

    // Test should delete event when found by id
    test("should delete event when found by id", async () => {
        // Arrange
        const existingEvent: Event = {
            id: "123",
            name: "Test Event",
            date: "2027-01-01T00:00:00.000Z",
            capacity: 100,
            registrationCount: 0,
            status: "active",
            category: "general",
            createdAt: "2027-01-01T00:00:00.000Z",
            updatedAt: "2027-01-01T00:00:00.000Z"
        };

        const mockDoc: { data: () => Event } = { data: () => existingEvent };

        jest.spyOn(firestoreRepository, 'getDocumentById')
            .mockResolvedValue(mockDoc as any);

        jest.spyOn(firestoreRepository, 'deleteDocument')
            .mockResolvedValue(undefined);

        // Act
        const result: { id: string } = await deleteEventService("123");

        // Assert
        expect(result).toEqual({ id: "123" });
    });
});