// Test case to detect the mutation in unhandled rejection tracking
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
    it("should correctly identify promises at index 0 in unhandledRejections array", () => {
        // Reset any previous unhandled rejections
        Q.resetUnhandledRejections();

        // Create a rejected promise
        const rejectedPromise = Q.reject(new Error("Test rejection"));

        // Mock process.emit to verify exact behavior
        const originalEmit = process.emit;
        let emitCalled = false;

        process.emit = function(event: string, reason: any, promise: any) {
            if (event === "unhandledRejection") {
                emitCalled = true;
                // Verify this is our promise
                if (promise !== rejectedPromise) {
                    throw new Error("Wrong promise emitted");
                }
            }
            return originalEmit.apply(process, arguments as any);
        };

        // Wait for rejection to be tracked
        return Q.delay(20).then(() => {
            // In original code, emit should be called
            // The mutation changes !== -1 to !== +1, which fails when index is 0
            expect(emitCalled).toBe(true);

            // Restore original emit
            process.emit = originalEmit;

            // Verify the promise is in unhandled reasons
            const reasons = Q.getUnhandledReasons();
            expect(reasons.length).toBe(1);

            // Clean up
            return rejectedPromise.catch(() => {});
        });
    });
});