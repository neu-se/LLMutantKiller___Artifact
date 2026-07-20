import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should handle promise rejection with error object correctly", () => {
        // Create a promise that rejects with an error object
        const promise = Q.reject(new Error("Test error"));

        // Create another promise that rejects with an error object
        const anotherPromise = Q.reject(new Error("Another test error"));

        // Test that the promise rejection is handled correctly
        Q.all([promise, anotherPromise]).catch((error: any) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).not.toBe("Another test error");
        });
    });
});