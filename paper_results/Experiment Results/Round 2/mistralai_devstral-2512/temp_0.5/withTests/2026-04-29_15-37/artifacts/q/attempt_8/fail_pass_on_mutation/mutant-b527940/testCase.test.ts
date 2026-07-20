// Test case to detect the mutation in unhandled rejection tracking
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
    it("should correctly identify and track the first unhandled rejection", () => {
        // Reset any previous unhandled rejections
        Q.resetUnhandledRejections();

        // Create a single rejected promise
        const rejectedPromise = Q.reject(new Error("Test rejection"));

        // Mock process.emit to track unhandledRejection events
        const originalEmit = process.emit;
        let unhandledRejectionEmitted = false;
        let emittedPromise: any = null;

        process.emit = function(event: string, reason: any, promise: any) {
            if (event === "unhandledRejection") {
                unhandledRejectionEmitted = true;
                emittedPromise = promise;
            }
            return originalEmit.apply(process, arguments as any);
        };

        // Wait for rejection to be tracked
        return Q.delay(20).then(() => {
            // In original code, the promise should be tracked and emit called
            // The mutation changes !== -1 to !== +1, which would fail for index 0
            // This means the emit wouldn't be called in the mutated version
            expect(unhandledRejectionEmitted).toBe(true);
            expect(emittedPromise).toBe(rejectedPromise);

            // Restore original emit
            process.emit = originalEmit;

            // Clean up by handling the promise
            return rejectedPromise.catch(() => {});
        });
    });
});