// Test to expose the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
    it("should not use process.nextTick in non-Node.js environments", (done) => {
        // Save original process
        const originalProcess = global.process;

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

        // Create and resolve a promise
        const deferred = Q.defer();
        let promiseResolved = false;

        deferred.promise.then(() => {
            promiseResolved = true;

            // If we get here, the correct mechanism was used
            expect(promiseResolved).toBe(true);

            // Restore original process
            (global as any).process = originalProcess;
            done();
        });

        // Resolve the promise
        deferred.resolve(42);

        // Timeout to ensure test completes
        setTimeout(() => {
            if (!promiseResolved) {
                (global as any).process = originalProcess;
                done(new Error("Test timed out"));
            }
        }, 100);
    });
});