// Test to expose the mutation in q.js
const Q = require("../../../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
    it("should use correct async mechanism in non-Node.js environments with process.nextTick", (done) => {
        // Save original process
        const originalProcess = global.process;
        const originalSetImmediate = global.setImmediate;

        // Create a fake process object that has nextTick but isn't Node.js
        const fakeProcess = {
            nextTick: (callback: Function) => {
                // This should NOT be used in the original code
                // because process.toString() !== "[object process]"
                done(new Error("process.nextTick was incorrectly used"));
            },
            toString: () => "[object Object]" // Not "[object process]"
        };

        // Replace global process
        (global as any).process = fakeProcess;

        // Track if setImmediate was called (expected fallback)
        let setImmediateCalled = false;
        global.setImmediate = (callback: Function) => {
            setImmediateCalled = true;
            return originalSetImmediate?.(callback);
        };

        // Create a promise that will trigger async execution
        const deferred = Q.defer();
        deferred.promise.then(() => {
            // In original code: should use setImmediate (true)
            // In mutated code: would use process.nextTick (false)
            expect(setImmediateCalled).toBe(true);

            // Restore originals
            (global as any).process = originalProcess;
            global.setImmediate = originalSetImmediate;
            done();
        });

        // Resolve the promise
        deferred.resolve(42);

        // Timeout fallback
        setTimeout(() => {
            (global as any).process = originalProcess;
            global.setImmediate = originalSetImmediate;
            done(new Error("Test timed out"));
        }, 100);
    });
});