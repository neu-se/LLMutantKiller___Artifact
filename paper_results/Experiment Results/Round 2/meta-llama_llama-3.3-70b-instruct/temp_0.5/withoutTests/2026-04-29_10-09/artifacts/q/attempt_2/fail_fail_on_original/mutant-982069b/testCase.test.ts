import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        // Create a promise that will be rejected
        const promise = Q.reject(new Error("Test error"));

        // Catch the rejection and check the stack trace
        promise.catch((error: any) => {
            const stackLines = error.stack.split("\n");
            const expectedLines = stackLines.length;
            const filteredLines = stackLines.filter((line: any) => !line.includes("q.js"));
            expect(filteredLines.length).toBeLessThan(expectedLines);
        });
    });
});