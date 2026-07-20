// Test case to detect the mutation in unhandled rejection tracking
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
    it("should correctly identify promises in unhandledRejections array at index 0", () => {
        // Reset any previous unhandled rejections
        Q.resetUnhandledRejections();

        // Create a promise that will be rejected but not handled
        const rejectedPromise = Q.reject(new Error("Test rejection"));

        // Mock process.emit to verify the exact behavior
        const originalEmit = process.emit;
        let emitCalled = false;
        let emitArgs = null;

        process.emit = function(event, ...args) {
            if (event === "unhandledRejection") {
                emitCalled = true;
                emitArgs = args;
            }
            return originalEmit.apply(process, [event, ...args]);
        };

        // Wait for the rejection to be tracked
        return Q.delay(10).then(() => {
            // In the original code, the promise should be at index 0 in unhandledRejections
            // The mutation changes !== -1 to !== +1, which would fail when index is 0
            // This means the emit wouldn't be called in the mutated version

            // Verify the emit was called (original behavior)
            expect(emitCalled).toBe(true);

            // Verify the correct arguments were passed
            expect(emitArgs.length).toBe(2);
            expect(emitArgs[1]).toBe(rejectedPromise);

            // Restore original emit
            process.emit = originalEmit;

            // Now handle the rejection to clean up
            return rejectedPromise.catch(() => {});
        });
    });
});