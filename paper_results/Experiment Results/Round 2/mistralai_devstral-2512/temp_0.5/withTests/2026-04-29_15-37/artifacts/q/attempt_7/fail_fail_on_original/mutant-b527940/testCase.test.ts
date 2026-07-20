// Test case to detect the mutation in unhandled rejection tracking
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
    it("should correctly track promises at index 0 in unhandledRejections array", () => {
        // Reset any previous unhandled rejections
        Q.resetUnhandledRejections();

        // Create multiple rejected promises to test array indexing
        const promise1 = Q.reject(new Error("First rejection"));
        const promise2 = Q.reject(new Error("Second rejection"));

        // Mock process.emit to track unhandledRejection events
        const originalEmit = process.emit;
        const emittedPromises = [];

        process.emit = function(event, reason, promise) {
            if (event === "unhandledRejection") {
                emittedPromises.push(promise);
            }
            return originalEmit.apply(process, arguments);
        };

        // Wait for rejections to be tracked
        return Q.delay(20).then(() => {
            // In original code, both promises should trigger emit
            // The mutation changes !== -1 to !== +1, which would fail for index 0
            // This means promise1 (at index 0) wouldn't trigger emit in mutated version

            // Verify both promises were tracked (original behavior)
            expect(emittedPromises.length).toBe(2);
            expect(emittedPromises[0]).toBe(promise1);
            expect(emittedPromises[1]).toBe(promise2);

            // Restore original emit
            process.emit = originalEmit;

            // Clean up by handling both promises
            return Q.all([
                promise1.catch(() => {}),
                promise2.catch(() => {})
            ]);
        });
    });
});