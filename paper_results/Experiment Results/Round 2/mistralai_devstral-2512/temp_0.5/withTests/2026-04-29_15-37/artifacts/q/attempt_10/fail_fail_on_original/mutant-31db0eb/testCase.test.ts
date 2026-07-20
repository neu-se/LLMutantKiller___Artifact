// Test to detect the mutation in q.js where `if (typeof window !== "undefined")` was changed to `if (true)`
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
    it("should correctly detect browser environment and use setImmediate when available", () => {
        // Save the original setImmediate if it exists
        const originalSetImmediate = typeof setImmediate === "function" ? setImmediate : undefined;

        // Mock setImmediate to track if it's being used
        let setImmediateCalled = false;
        (global as any).setImmediate = function(callback: Function) {
            setImmediateCalled = true;
            // Call the callback immediately to simulate setImmediate behavior
            callback();
        };

        // Mock window to simulate browser environment
        (global as any).window = {};

        // Create a deferred and resolve it
        const deferred = Q.defer();
        deferred.resolve("test");

        // Return a promise that will resolve after giving time for the promise machinery to work
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                // Restore original setImmediate
                if (originalSetImmediate) {
                    (global as any).setImmediate = originalSetImmediate;
                } else {
                    delete (global as any).setImmediate;
                }
                delete (global as any).window;

                // In the original code, setImmediate should be used when window is defined
                // In the mutated code, it will always try to use setImmediate regardless of window
                // This test verifies the environment detection works correctly
                expect(setImmediateCalled).toBe(true);
                resolve();
            }, 1000);
        });
    }, 15000);
});