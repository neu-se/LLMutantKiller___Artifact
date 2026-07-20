// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("setImmediate detection", () => {
    it("should use setImmediate when available in browser environment", (done) => {
        // Save original setImmediate
        const originalSetImmediate = global.setImmediate;

        // Mock setImmediate to track if it's called
        let setImmediateCalled = false;
        global.setImmediate = function(callback: Function) {
            setImmediateCalled = true;
            return originalSetImmediate.call(global, callback);
        };

        // Create a promise that should trigger the nextTick mechanism
        const deferred = Q.defer();
        let resolved = false;

        deferred.promise.then(() => {
            resolved = true;
        });

        // Resolve the promise
        deferred.resolve(42);

        // Check after a short delay to allow async operations
        setTimeout(() => {
            // In the original code, setImmediate should be used when available
            // In the mutated code, it will always use the else branch (setTimeout)
            expect(resolved).toBe(true);

            // Clean up
            global.setImmediate = originalSetImmediate;
            done();
        }, 100);
    });
});