// Test case to detect the mutation in unhandled rejection tracking
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
    it("should correctly track promises in unhandledRejections array using array_indexOf", () => {
        // Reset any previous unhandled rejections
        Q.resetUnhandledRejections();

        // Create a rejected promise
        const rejectedPromise = Q.reject(new Error("Test rejection"));

        // Wait for the rejection to be tracked
        return Q.delay(20).then(() => {
            // Get the internal unhandledRejections array through Q.getUnhandledReasons()
            // The mutation changes array_indexOf(unhandledRejections, promise) !== -1 to !== +1
            // This means when the promise is at index 0, the condition fails in mutated version

            // In original code, the rejection should be tracked
            const reasons = Q.getUnhandledReasons();
            expect(reasons.length).toBe(1);

            // Now test the specific behavior that the mutation affects
            // Create a scenario where we need to check if a promise is in the array at index 0
            // The mutation would cause this check to fail

            // Handle the rejection
            rejectedPromise.catch(() => {});

            // Wait for handling to complete
            return Q.delay(20).then(() => {
                // After handling, reasons should be cleared
                const reasonsAfter = Q.getUnhandledReasons();
                expect(reasonsAfter.length).toBe(0);

                // Create another rejection to test the array indexing
                const anotherPromise = Q.reject(new Error("Another rejection"));

                return Q.delay(20).then(() => {
                    // This should be tracked at index 0
                    const newReasons = Q.getUnhandledReasons();
                    expect(newReasons.length).toBe(1);

                    // Clean up
                    return anotherPromise.catch(() => {});
                });
            });
        });
    });
});