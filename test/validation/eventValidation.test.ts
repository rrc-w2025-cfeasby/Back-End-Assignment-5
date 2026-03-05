import { createEventSchema } from "../../src/api/v1/validation/eventSchemas";

/**
 * Event Validation Schema Tests
 *
 * Tests the Joi validation schema for event creation.
 */
describe("Event Validation Schema", () => {
    // Test case for Missing Required Field name
    test("should fail validation when required field name is missing", () => {
        // Arrange
        const data: any = {};

        // Act
        const { error } = createEventSchema.validate(data);

        // Assert
        expect(error).toBeTruthy();
        expect(error?.details[0].message).toContain('"name" is required');
    });
 
    // Test for date being in the past
    test("should fail when date is in the past", () => {
        // Arrange
        const data: any = {
            name: "Past Event",
            date: "2020-01-01T00:00:00.000Z",
            capacity: 100
        };

        // Act
        const { error } = createEventSchema.validate(data);

        // Assert
        expect(error).toBeTruthy();
        expect(error?.details[0].message).toContain('"date" must be greater than "now"');
    });

    // Test case for capacity below minimum
    test("should fail when capacity is below minimum", () => {
        // Arrange
        const data: any = {
            name: "Small Event",
            date: "2027-01-01T00:00:00.000Z",
            capacity: 4
        };

        // Act
        const { error } = createEventSchema.validate(data);

        // Assert
        expect(error).toBeTruthy();
        expect(error?.details[0].message).toContain('"capacity" must be greater than or equal to 5');
    });

    // Test case for registrationCount exceeds capcity
    test("should fail when registrationCount exceeds capacity", () => {
        // Arrange
        const data = {
            name: "Overbooked Event",
            date: "2027-01-01T00:00:00.000Z",
            capacity: 100,
            registrationCount: 150
        };

        // Act
        const { error } = createEventSchema.validate(data);

        // Assert
        expect(error).toBeTruthy();
        expect(error?.details[0].message).toContain('"registrationCount" must be less than or equal to ref:capacity');
    });
});