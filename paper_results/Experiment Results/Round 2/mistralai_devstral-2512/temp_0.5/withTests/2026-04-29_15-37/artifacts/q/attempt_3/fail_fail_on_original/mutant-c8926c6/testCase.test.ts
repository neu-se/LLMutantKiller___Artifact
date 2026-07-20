// Test to expose the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
    it("should correctly identify non-Node.js environments with process.nextTick", (done) => {
        // Save original process
        const originalProcess = global.process;

        // Create a fake process object that has nextTick but isn't Node.js
        const fakeProcess = {
            nextTick: (callback: Function) => {
                // This should NOT be used in the original code
                // because process.toString() !== "[object process]"
                setTimeout(callback, 0);
            },
            toString: () => "[object Object]" // Not "[object process]"
        };

        // Replace global process
        (global as any).process = fakeProcess;

        // Track execution order
        const executionOrder: string[] = [];
        let testCompleted = false;

        // Create a promise that will trigger the nextTick detection
        const deferred = Q.defer();
        let promiseResolved = false;

        deferred.promise.then(() => {
            promiseResolved = true;
            executionOrder.push("promise-resolved");

            // Check if we used the correct mechanism
            // In original code: should use setImmediate/setTimeout (executionOrder[0] === "setImmediate")
            // In mutated code: would use process.nextTick (executionOrder[0] === "nextTick")
            if (!testCompleted) {
                testCompleted = true;
                expect(executionOrder[0]).toBe("setImmediate");
                expect(promiseResolved).toBe(true);

                // Restore original process
                (global as any).process = originalProcess;
                done();
            }
        });

        // Override setImmediate to track if it's called
        const originalSetImmediate = global.setImmediate;
        global.setImmediate = (callback: Function) => {
            executionOrder.push("setImmediate");
            return originalSetImmediate?.(callback);
        };

        // Resolve the promise
        setTimeout(() => {
            deferred.resolve(42);
        }, 0);

        // Timeout to ensure test completes
        setTimeout(() => {
            if (!testCompleted) {
                (global as any).process = originalProcess;
                global.setImmediate = originalSetImmediate;
                done(new Error("Test timed out"));
            }
        }, 100);
    });
});