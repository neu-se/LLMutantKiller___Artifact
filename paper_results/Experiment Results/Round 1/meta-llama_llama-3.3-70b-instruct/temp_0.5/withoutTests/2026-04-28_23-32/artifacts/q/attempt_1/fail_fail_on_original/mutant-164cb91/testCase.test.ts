import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        // Create a promise that will be rejected
        const rejectedPromise = Q.reject(new Error("Test error"));

        // Track the rejection
        const originalUnhandledRejections = Q.getUnhandledReasons();

        // Test that the rejection is tracked
        Q.nextTick(() => {
            const unhandledRejections = Q.getUnhandledReasons();
            expect(unhandledRejections.length).toBe(originalUnhandledRejections.length + 1);
        });

        // Untrack the rejection
        rejectedPromise.then(null, () => {});

        // Test that the rejection is no longer tracked
        Q.nextTick(() => {
            const unhandledRejections = Q.getUnhandledReasons();
            expect(unhandledRejections.length).toBe(originalUnhandledRejections.length);
        });
    });
});