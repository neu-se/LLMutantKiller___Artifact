import { Q } from './q.js';

describe("Q", () => {
    it("should handle uncaught exceptions in Node.js environment", () => {
        // Create a promise that throws an error
        const promise = Q((resolve, reject) => {
            reject(new Error("Test error"));
        });

        // Wait for the promise to be rejected
        return promise.catch((error) => {
            expect(error.message).toBe("Test error");
        });
    });
});