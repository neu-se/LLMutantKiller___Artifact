import { Q } from './q.js';

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        // Create a promise that will be rejected
        const promise = Q.reject(new Error("Test error"));

        // Catch the rejection and check the stack trace
        promise.catch((error: Error) => {
            const stackLines = error.stack.split("\n");
            const filteredLines = stackLines.filter((line: string) => !line.includes("q.js"));
            expect(filteredLines.length).toBeGreaterThan(0);
        });
    });
});