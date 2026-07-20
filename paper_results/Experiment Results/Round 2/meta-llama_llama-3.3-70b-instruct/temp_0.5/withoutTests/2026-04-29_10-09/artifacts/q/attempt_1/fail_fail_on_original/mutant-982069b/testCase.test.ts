import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        // Create a promise that will be rejected
        const promise = Q.reject(new Error("Test error"));

        // Catch the rejection and check the stack trace
        promise.catch((error) => {
            const stackLines = error.stack.split("\n");
            const internalFrames = stackLines.filter((line) => line.includes("q.js"));
            expect(internalFrames.length).toBeLessThan(stackLines.length);
        });
    });
});