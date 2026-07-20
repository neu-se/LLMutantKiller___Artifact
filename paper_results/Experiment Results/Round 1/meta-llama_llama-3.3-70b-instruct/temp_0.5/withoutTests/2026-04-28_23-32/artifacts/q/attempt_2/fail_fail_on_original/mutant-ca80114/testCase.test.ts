import { Q } from "./q.js";

describe("Q", () => {
    it("should handle uncaught exceptions in Node.js environment", () => {
        // Create a promise that throws an error
        const promise = Q((resolve, reject) => {
            reject(new Error("Test error"));
        });

        // Set up an event listener to catch the unhandled rejection
        let rejectionHandled = false;
        process.on("unhandledRejection", () => {
            rejectionHandled = true;
        });

        // Wait for the promise to be rejected
        return promise.catch(() => {
            expect(rejectionHandled).toBe(true);
        });
    });
});