// Test to expose the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Node.js environment detection", () => {
    it("should use setTimeout fallback when process.nextTick exists but process is not Node.js", (done) => {
        // Save original process and setImmediate
        const originalProcess = global.process;
        const originalSetImmediate = global.setImmediate;

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

        // Track if setImmediate was called (which is the expected fallback)
        let setImmediateCalled = false;
        global.setImmediate = (callback: Function) => {
            setImmediateCalled = true;
            return originalSetImmediate?.(callback);
        };

        // Create and resolve a promise to trigger the nextTick detection
        const promise = Q();
        let promiseResolved = false;

        promise.then(() => {
            promiseResolved = true;
        });

        // Check after a short delay
        setTimeout(() => {
            // Restore originals
            (global as any).process = originalProcess;
            global.setImmediate = originalSetImmediate;

            // In original code: should use setImmediate (true)
            // In mutated code: would use process.nextTick (false)
            expect(setImmediateCalled).toBe(true);
            expect(promiseResolved).toBe(true);
            done();
        }, 20);
    });
});