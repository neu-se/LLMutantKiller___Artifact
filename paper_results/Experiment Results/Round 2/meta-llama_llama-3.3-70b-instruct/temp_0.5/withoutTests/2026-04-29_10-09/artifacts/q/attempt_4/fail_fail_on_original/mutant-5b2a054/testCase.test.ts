import { Q } from "../../../../../q.js";

describe("Q promise library", () => {
    it("should reject promise with error when uncaught exception occurs in non-Node environment", (done) => {
        // Create a promise that throws an error
        const promise = Q((resolve, reject) => {
            throw new Error("Test error");
        });

        // Catch the error and check if it's the same as the original error
        promise.catch((error) => {
            expect(error.message).toBe("Test error");
            done();
        });
    });
});