import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should filter stack traces correctly", () => {
        // Create a promise that rejects with an error
        const promise = Q.reject(new Error("Test error"));

        // Catch the error and check the stack trace
        promise.catch((error: any) => {
            const stackTrace = error.stack;
            expect(stackTrace).toContain("isInternalFrame");
        });
    });
});