import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should handle promise rejection with error object correctly", () => {
        // Create a promise that rejects with an error object
        const promise = Q.reject(new Error("Test error"));

        // Test that the promise rejection is handled correctly
        promise.catch((error: any) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Test error");
        });

        // Test that the promise stack is correctly filtered
        const promiseStack = promise.catch((error: any) => error).then((error: any) => error.stack);
        promiseStack.then((stack: any) => {
            expect(stack).not.toContain("q.js");
            expect(stack).toContain("Test error");
        });
    });
});