import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace handling when hasStacks is false", () => {
    it("should handle environments without stack trace support", () => {
        // Save the original hasStacks value
        const originalHasStacks = (Q as any).longStackSupport;

        // Force hasStacks to be false
        (Q as any).longStackSupport = false;

        // Create and reject a promise
        const error = new Error("Test error");
        const promise = Q.reject(error);

        // Verify the promise is rejected
        return promise.then(
            () => {
                throw new Error("Promise should have been rejected");
            },
            (rejectedError) => {
                expect(rejectedError).toBe(error);
            }
        ).finally(() => {
            // Restore the original value
            (Q as any).longStackSupport = originalHasStacks;
        });
    });
});