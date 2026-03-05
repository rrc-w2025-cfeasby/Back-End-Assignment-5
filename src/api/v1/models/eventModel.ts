/**
 * Event Status can be one of the following values:
 * - "active"
 * - "cancelled"
 * - "completed"
 */
export type EventStatus = "active" | "cancelled" | "completed";

/**
 * Event Category can be one of the following values:
 * - "conference"
 * - "workshop"
 * - "meetup"
 * - "seminar"
 * - "general"
 */
export type EventCategory = 
    | "conference"
    | "workshop"
    | "meetup"
    | "seminar"
    | "general";

/**
 * Event interface representing the structure of an event object.
 * 
 * Fields:
 * - id: string (UUID)
 * - name: string
 * - date: string (ISO date string)
 * - capacity: number
 * - registrationCount: number
 * - status: EventStatus
 * - category: EventCategory
 * - createdAt: string (ISO date string)
 * - updatedAt: string (ISO date string)
 * @returns Event interface
 */
export interface Event {
    id: string;
    name: string;
    date: string;
    capacity: number;
    registrationCount: number
    status: EventStatus;
    category: EventCategory;
    createdAt: string;
    updatedAt: string;
}