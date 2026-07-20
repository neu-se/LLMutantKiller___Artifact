import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should correctly handle promise rejection with error object", () => {
        // Create a promise that rejects with an error object
        const promise = Q.reject(new Error("Test error"));

        // Check if the promise is rejected with the correct error
        return promise.catch((error) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Test error");
            expect(error.stack).toBeDefined();
        });
    });
});