// Test to expose the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
    it("should use correct async mechanism based on environment detection", (done) => {
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

        // Track which mechanism was used
        let mechanismUsed: string | null = null;

        // Override setImmediate to detect if it's used
        const originalSetImmediate = global.setImmediate;
        global.setImmediate = (callback: Function) => {
            mechanismUsed = "setImmediate";
            return originalSetImmediate?.(callback);
        };

        // Create and resolve a promise
        const deferred = Q.defer();
        let promiseResolved = false;

        deferred.promise.then(() => {
            promiseResolved = true;

            // Check which mechanism was used
            // Original code should use setImmediate
            // Mutated code would use process.nextTick (which we detect as setTimeout)
            expect(mechanismUsed).toBe("setImmediate");
            expect(promiseResolved).toBe(true);

            // Restore originals
            (global as any).process = originalProcess;
            global.setImmediate = originalSetImmediate;
            done();
        });

        // Resolve the promise after a short delay
        setTimeout(() => {
            deferred.resolve(42);
        }, 0);
    });
});