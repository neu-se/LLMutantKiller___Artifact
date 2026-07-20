const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library async scheduling", () => {
    it("should use setImmediate when available for promise scheduling", (done) => {
        // Track which async mechanism is used
        const executionOrder: string[] = [];
        const originalSetImmediate = global.setImmediate;
        const originalSetTimeout = global.setTimeout;

        // Mock setImmediate to detect usage
        let setImmediateUsed = false;
        global.setImmediate = function(callback: (...args: any[]) => void): any {
            setImmediateUsed = true;
            executionOrder.push("setImmediate");
            return originalSetImmediate(callback);
        };

        // Mock setTimeout to detect fallback usage
        let setTimeoutUsed = false;
        global.setTimeout = function(callback: (...args: any[]) => void, ms?: number): any {
            if (ms === 0) {
                setTimeoutUsed = true;
                executionOrder.push("setTimeout");
            }
            return originalSetTimeout(callback, ms);
        };

        // Create a simple promise chain that requires async scheduling
        Q.resolve()
            .then(() => {
                executionOrder.push("then1");
                return Q.resolve();
            })
            .then(() => {
                executionOrder.push("then2");

                // Restore original functions
                global.setImmediate = originalSetImmediate;
                global.setTimeout = originalSetTimeout;

                // Verify the correct async mechanism was used
                if (typeof originalSetImmediate === 'function') {
                    // Original code should use setImmediate when available
                    expect(setImmediateUsed).toBe(true);
                    expect(setTimeoutUsed).toBe(false);
                    expect(executionOrder[0]).toBe("setImmediate");
                } else {
                    // Fallback to setTimeout when setImmediate not available
                    expect(setTimeoutUsed).toBe(true);
                }
                done();
            })
            .done();
    });
});