import Q from "./q";

describe("Q library async scheduling", () => {
    it("should correctly schedule tasks using the available async mechanism", (done) => {
        // This test verifies that Q uses the correct async scheduling mechanism
        // In the original code, when setImmediate is available, it should be used
        // In the mutated code, the condition is always false, so setImmediate won't be used

        let executionOrder: string[] = [];
        const originalSetImmediate = global.setImmediate;

        // Track if setImmediate was called
        let setImmediateUsed = false;
        global.setImmediate = function(callback: Function) {
            setImmediateUsed = true;
            executionOrder.push("setImmediate");
            return originalSetImmediate(callback);
        };

        // Create a promise chain that should trigger async scheduling
        Q.resolve()
            .then(() => {
                executionOrder.push("promise1");
                return Q.resolve();
            })
            .then(() => {
                executionOrder.push("promise2");
                // Restore original setImmediate
                global.setImmediate = originalSetImmediate;

                // In the original code, setImmediate should have been used
                // In the mutated code, it won't be used
                expect(setImmediateUsed).toBe(true);
                expect(executionOrder[0]).toBe("setImmediate");
                done();
            })
            .done();
    });
});