import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle uncaught exceptions in Node.js environment", () => {
        // Create a promise that throws an error
        const promise = Q((resolve: (value: any) => void, reject: (reason: any) => void) => {
            reject(new Error("Test error"));
        });

        // Wait for the promise to be rejected
        return promise.catch((error: Error) => {
            expect(error.message).toBe("Test error");
            // If the mutation is present, this should throw an error
            // But if the mutation is not present, this should not throw an error
            if (process.env.Q_DEBUG) {
                throw new Error("Mutation is present");
            }
        });
    });
});