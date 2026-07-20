// Test case to detect the mutation in unhandled rejection tracking
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
    it("should properly track unhandled rejections in the unhandledRejections array", () => {
        // Reset any previous unhandled rejections
        Q.resetUnhandledRejections();

        // Create a promise that will be rejected but not handled
        const rejectedPromise = Q.reject(new Error("Test rejection"));

        // Wait for the rejection to be tracked
        return Q.delay(10).then(() => {
            // Access the internal unhandledRejections array through the module
            // The mutation changes array_indexOf(unhandledRejections, promise) !== -1 to !== +1
            // This means in the mutated version, the promise won't be found in the array
            // when it should be at index 0

            // We need to check if the promise is actually in the tracking array
            // Since we can't directly access the internal array, we'll verify through behavior
            // The mutation would cause the process.emit check to fail since the index check would be wrong

            // In the original code, the rejection should be tracked
            const reasons = Q.getUnhandledReasons();
            expect(reasons.length).toBe(1);

            // The key difference: in the mutated version, the condition `!== +1` would fail
            // when checking if the promise is in the unhandledRejections array at index 0
            // This would prevent the unhandledRejection event from being emitted
            // We can detect this by checking if the promise is still considered unhandled

            // Now handle the rejection
            rejectedPromise.catch(() => {});

            // Wait for the handling to be processed
            return Q.delay(10).then(() => {
                // After handling, the reasons should be cleared
                const reasonsAfter = Q.getUnhandledReasons();
                expect(reasonsAfter.length).toBe(0);
            });
        });
    });
});