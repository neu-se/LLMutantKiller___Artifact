// Test case to detect the mutation in unhandled rejection tracking
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
    it("should properly emit unhandledRejection events for tracked promises", () => {
        // Reset any previous unhandled rejections
        Q.resetUnhandledRejections();

        // Create a promise that will be rejected but not handled
        const rejectedPromise = Q.reject(new Error("Test rejection"));

        // Mock process.emit to track if unhandledRejection event is emitted
        const originalEmit = process.emit;
        let unhandledRejectionEmitted = false;
        let rejectionHandledEmitted = false;

        process.emit = function(event, ...args) {
            if (event === "unhandledRejection") {
                unhandledRejectionEmitted = true;
            } else if (event === "rejectionHandled") {
                rejectionHandledEmitted = true;
            }
            return originalEmit.apply(process, [event, ...args]);
        };

        // Wait for the rejection to be tracked and event to be emitted
        return Q.delay(10).then(() => {
            // In the original code, unhandledRejection should be emitted
            expect(unhandledRejectionEmitted).toBe(true);

            // Now handle the rejection
            rejectedPromise.catch(() => {});

            // Wait for rejectionHandled event
            return Q.delay(10).then(() => {
                // In the original code, rejectionHandled should be emitted
                expect(rejectionHandledEmitted).toBe(true);

                // Restore original emit
                process.emit = originalEmit;
            });
        });
    });
});