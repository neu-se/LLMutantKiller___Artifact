import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should correctly handle promise rejection", () => {
        // Create a promise that rejects
        const promise = Q.reject(new Error("Test error"));

        // Check if the promise is rejected with the correct error
        return promise.catch((error) => {
            expect(error instanceof Error).toBe(true);
        });
    });
});