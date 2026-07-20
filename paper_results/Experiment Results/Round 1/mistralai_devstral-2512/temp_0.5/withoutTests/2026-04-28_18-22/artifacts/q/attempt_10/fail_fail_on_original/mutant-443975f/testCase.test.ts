const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library scheduling mechanism", () => {
    it("should use setImmediate when available", (done) => {
        // Track the order of execution to detect scheduling mechanism
        const executionOrder: string[] = [];
        const originalSetImmediate = global.setImmediate;
        const originalSetTimeout = global.setTimeout;

        // Flag to track if setImmediate was used
        let setImmediateUsed = false;

        // Override setImmediate to detect usage
        global.setImmediate = function(callback: any) {
            setImmediateUsed = true;
            executionOrder.push("setImmediate");
            return originalSetImmediate(callback);
        };

        // Override setTimeout to detect fallback usage
        global.setTimeout = function(callback: any, ms?: number) {
            if (ms === 0) {
                executionOrder.push("setTimeout");
            }
            return originalSetTimeout(callback, ms);
        };

        // Create a promise that requires scheduling
        Q.resolve()
            .then(() => {
                executionOrder.push("promise1");
                return Q.resolve();
            })
            .then(() => {
                executionOrder.push("promise2");

                // Restore original functions
                global.setImmediate = originalSetImmediate;
                global.setTimeout = originalSetTimeout;

                // In original code: setImmediate should be used when available
                // In mutated code: setImmediate won't be used (falls back to setTimeout)
                if (typeof originalSetImmediate === 'function') {
                    expect(setImmediateUsed).toBe(true);
                    expect(executionOrder[0]).toBe("setImmediate");
                }
                done();
            })
            .done();
    });
});