import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle hasStacks correctly", () => {
        // Create a promise that will be rejected
        const promise = Q.reject(new Error("Test error"));

        // Check if the promise is rejected
        promise.then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            // If hasStacks is true, the error should have a stack trace
            if (hasStacks) {
                expect(error.stack).not.toBeUndefined();
            } else {
                expect(error.stack).toBeUndefined();
            }
        });
    });
});