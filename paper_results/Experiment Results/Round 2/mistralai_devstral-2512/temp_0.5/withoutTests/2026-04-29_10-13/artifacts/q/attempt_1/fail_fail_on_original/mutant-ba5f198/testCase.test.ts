// Test case to detect the mutation in q.js
import { Q } from "./q.js";

describe("Q promise library setImmediate detection", () => {
    it("should use setImmediate when available for async scheduling", (done) => {
        // This test verifies that Q uses setImmediate when it's available
        // The mutation changes the condition from `typeof setImmediate === "function"`
        // to `typeof setImmediate !== "function"`, which would break this behavior

        // Save original setImmediate if it exists
        const originalSetImmediate = global.setImmediate;

        // Mock setImmediate to track if it's being used
        global.setImmediate = jest.fn((fn) => {
            // Call the function in next tick to simulate setImmediate behavior
            process.nextTick(fn);
            return { unref: () => {} };
        });

        try {
            // Force re-evaluation of the async mechanism by reloading Q
            // We need to test the actual behavior, so we'll check if setImmediate is called
            let setImmediateCalled = false;

            // Override the mock to track calls
            global.setImmediate = jest.fn((fn) => {
                setImmediateCalled = true;
                process.nextTick(fn);
                return { unref: () => {} };
            });

            // Create a promise and check if setImmediate is used for scheduling
            const deferred = Q.defer();
            let resolved = false;

            deferred.promise.then(() => {
                resolved = true;
            });

            deferred.resolve(42);

            // Give some time for the async operation to complete
            setTimeout(() => {
                // In the original code, setImmediate should be called when available
                // In the mutated code, it won't be called (due to the reversed condition)
                expect(setImmediateCalled).toBe(true);
                done();
            }, 50);
        } finally {
            // Restore original setImmediate
            global.setImmediate = originalSetImmediate;
        }
    });
});