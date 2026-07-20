// Test to expose the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Node.js environment detection", () => {
    it("should correctly identify non-Node.js environments even with process.nextTick", (done) => {
        // Save the original process object
        const originalProcess = global.process;

        // Create a fake process object that has nextTick but is not a real Node.js process
        const fakeProcess = {
            nextTick: (callback: Function) => {
                // Use setTimeout to simulate nextTick in a non-Node environment
                setTimeout(callback, 0);
            },
            toString: () => "[object Object]" // Not "[object process]"
        };

        // Replace the global process object
        (global as any).process = fakeProcess;

        // Track which mechanism was used
        let mechanismUsed: string | null = null;
        const originalSetImmediate = global.setImmediate;
        const originalSetTimeout = global.setTimeout;

        // Spy on setImmediate to detect if it's used
        global.setImmediate = (callback: Function) => {
            mechanismUsed = "setImmediate";
            return originalSetImmediate?.(callback);
        };

        // Spy on setTimeout to detect if it's used
        global.setTimeout = (callback: Function, timeout?: number) => {
            if (timeout === 0 && mechanismUsed === null) {
                mechanismUsed = "setTimeout";
            }
            return originalSetTimeout(callback, timeout);
        };

        // Create a promise and force the nextTick detection
        const deferred = Q.defer();
        let resolved = false;

        deferred.promise.then(() => {
            resolved = true;
        });

        // Resolve the promise
        deferred.resolve(42);

        // Check after a short delay to see which mechanism was used
        setTimeout(() => {
            // Restore original process and functions
            (global as any).process = originalProcess;
            global.setImmediate = originalSetImmediate;
            global.setTimeout = originalSetTimeout;

            // In the original code, it should use setImmediate or setTimeout (not process.nextTick)
            // In the mutated code, it would incorrectly use process.nextTick
            // Since we've replaced process.nextTick with setTimeout, we can detect the behavior
            expect(mechanismUsed).toBe("setImmediate");
            expect(resolved).toBe(true);
            done();
        }, 10);
    });
});