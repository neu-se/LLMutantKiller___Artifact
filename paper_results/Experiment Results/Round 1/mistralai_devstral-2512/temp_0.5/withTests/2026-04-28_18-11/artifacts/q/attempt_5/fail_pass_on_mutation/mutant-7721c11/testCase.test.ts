import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly handle promise rejection tracking using array_indexOf", () => {
        // This test targets the array_indexOf mutation by creating a scenario
        // where Q's unhandled rejection tracking uses array_indexOf internally
        // The mutation changes `if (this[i] === value)` to `if (false)`
        // which would break the rejection tracking

        // Reset unhandled rejections tracking
        Q.resetUnhandledRejections();

        // Create and reject a promise
        const rejectedPromise = Q.reject("test rejection");

        // Give time for the rejection to be tracked
        return Q.delay(10).then(() => {
            // Get the unhandled reasons
            const reasons = Q.getUnhandledReasons();

            // The mutation would prevent the rejection from being tracked
            // because array_indexOf would always return -1
            // So the reasons array should contain our rejection
            expect(reasons.length).toBeGreaterThan(0);
            expect(reasons[0]).toContain("test rejection");
        });
    });
});