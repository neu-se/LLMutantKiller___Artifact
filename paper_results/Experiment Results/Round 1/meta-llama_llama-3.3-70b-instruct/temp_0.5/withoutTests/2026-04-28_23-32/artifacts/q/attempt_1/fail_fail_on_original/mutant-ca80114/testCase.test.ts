import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle uncaught exceptions in Node.js environment", () => {
        // Create a promise that throws an error
        const promise = Q.Promise((resolve, reject) => {
            reject(new Error("Test error"));
        });

        // Set up an event listener to catch the unhandled rejection
        let rejectionHandled = false;
        process.on("unhandledRejection", () => {
            rejectionHandled = true;
        });

        // Wait for the promise to be rejected
        return promise.catch(() => {
            // If the mutation is present, this should not throw an error
            // But if the mutation is not present, this should throw an error in Node.js environment
            if (rejectionHandled) {
                throw new Error("Unhandled rejection was handled");
            }
        });
    });
});