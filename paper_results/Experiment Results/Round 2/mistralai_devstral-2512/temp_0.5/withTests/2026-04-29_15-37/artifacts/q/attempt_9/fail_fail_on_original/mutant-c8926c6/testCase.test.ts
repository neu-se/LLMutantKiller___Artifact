// Test to expose the mutation in q.js
const Q = require("../../../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
    it("should use correct async mechanism based on environment", (done) => {
        // Save original process and nextTick
        const originalProcess = global.process;
        const originalNextTick = Q.nextTick;

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

        // Force re-evaluation of environment detection
        // by deleting the cached nextTick function
        delete require.cache[require.resolve("../../../../../../../../../../../../../subject_repositories/q/q.js")];
        const Q2 = require("../../../../../../../../../../../../../subject_repositories/q/q.js");

        // Create a promise that will trigger async execution
        const deferred = Q2.defer();
        deferred.promise.then(() => {
            // If we get here without error, the correct mechanism was used
            // Restore originals
            (global as any).process = originalProcess;
            Q.nextTick = originalNextTick;
            done();
        });

        // Resolve the promise
        deferred.resolve(42);

        // Timeout fallback
        setTimeout(() => {
            (global as any).process = originalProcess;
            Q.nextTick = originalNextTick;
            done(new Error("Test timed out"));
        }, 100);
    });
});