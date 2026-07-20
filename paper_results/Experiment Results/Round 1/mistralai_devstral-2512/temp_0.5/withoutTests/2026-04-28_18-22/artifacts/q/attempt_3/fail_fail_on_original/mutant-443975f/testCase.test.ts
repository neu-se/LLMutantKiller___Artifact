const Q = require("./q");

describe("Q library async scheduling mechanism", () => {
    it("should use setImmediate when available for scheduling", (done) => {
        // Track execution order to detect which async mechanism is used
        const executionOrder: string[] = [];
        const originalSetImmediate = global.setImmediate;
        const originalSetTimeout = global.setTimeout;

        // Mock setImmediate to detect if it's being used
        let setImmediateUsed = false;
        global.setImmediate = function(callback: Function) {
            setImmediateUsed = true;
            executionOrder.push("setImmediate");
            return originalSetImmediate(callback);
        };

        // Mock setTimeout to detect if it's being used as fallback
        let setTimeoutUsed = false;
        global.setTimeout = function(callback: Function, timeout?: number) {
            if (timeout === 0) {
                setTimeoutUsed = true;
                executionOrder.push("setTimeout");
            }
            return originalSetTimeout(callback, timeout);
        };

        // Create a promise that should trigger async scheduling
        Q.resolve()
            .then(() => {
                executionOrder.push("then1");
                return Q.delay(0);
            })
            .then(() => {
                executionOrder.push("then2");

                // Restore original functions
                global.setImmediate = originalSetImmediate;
                global.setTimeout = originalSetTimeout;

                // In original code: setImmediate should be used when available
                // In mutated code: setImmediate won't be used (falls back to setTimeout)
                if (typeof originalSetImmediate === 'function') {
                    expect(setImmediateUsed).toBe(true);
                    expect(executionOrder[0]).toBe("setImmediate");
                } else {
                    expect(setTimeoutUsed).toBe(true);
                    expect(executionOrder[0]).toBe("setTimeout");
                }
                done();
            })
            .done();
    });
});