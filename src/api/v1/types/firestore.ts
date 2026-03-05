/**
 * Firestore Data Types Interface
 */
export interface FirestoreDataTypes {
    stringValue?: string;
    numberValue?: number;
    booleanValue?: boolean;
    nullValue?: null;
    dateValue?: Date;
    objectValue?: Record<string, unknown>;
    arrayValue?: Array<unknown>;
};