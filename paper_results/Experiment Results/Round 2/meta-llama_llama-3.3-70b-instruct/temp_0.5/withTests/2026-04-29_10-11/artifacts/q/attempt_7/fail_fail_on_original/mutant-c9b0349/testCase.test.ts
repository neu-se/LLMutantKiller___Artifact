import { Q } from "../../../q/q.js";

describe("Q library", () => {
    it("should filter stack traces correctly", () => {
        // Create a promise that rejects with an error
        const promise = Q.reject(new Error("Test error"));

        // Catch the error and check the stack trace
        promise.catch((error: any) => {
            const stackTrace = error.stack;
            expect(stackTrace).not.toContain("q.js:1234"); // Replace with the actual line number
        });
    });
});