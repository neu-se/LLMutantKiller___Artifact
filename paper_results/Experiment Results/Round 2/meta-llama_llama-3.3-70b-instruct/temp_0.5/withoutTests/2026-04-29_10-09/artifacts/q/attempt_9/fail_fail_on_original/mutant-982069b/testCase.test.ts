import { Q } from '../q';

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        // Create a promise that will be rejected
        const promise = Q.reject(new Error("Test error"));

        // Catch the rejection and check the stack trace
        promise.catch((error: Error) => {
            if (error.stack) {
                const stackLines = error.stack.split("\n");
                const hasQFrame = stackLines.some((line: string) => line.includes("q.js"));
                expect(hasQFrame).toBe(false);
            } else {
                throw new Error("Error stack is undefined");
            }
        });
    });
});