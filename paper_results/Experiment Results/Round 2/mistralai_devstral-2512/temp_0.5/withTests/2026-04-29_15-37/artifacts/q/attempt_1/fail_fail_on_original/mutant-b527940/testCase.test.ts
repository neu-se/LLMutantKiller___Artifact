// Test case to detect the mutation in unhandled rejection tracking
import { Q } from "./q.js";

describe("unhandled rejection tracking", () => {
    it("should properly track and report unhandled rejections", () => {
        // Reset any previous unhandled rejections
        Q.resetUnhandledRejections();

        // Create a promise that will be rejected but not handled
        const rejectedPromise = Q.reject(new Error("Test rejection"));

        // Wait for the rejection to be tracked
        return Q.delay(10).then(() => {
            // Check that the rejection was tracked
            const reasons = Q.getUnhandledReasons();
            expect(reasons.length).toBeGreaterThan(0);

            // The mutation changes the condition from !== -1 to !== +1
            // This would cause the tracking to fail, resulting in no unhandled reasons
            // In the original code, this should work correctly
            expect(reasons.length).toBe(1);
        });
    });
});