// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("setImmediate detection", () => {
    it("should use setImmediate when available in browser environment", (done) => {
        // Save original setImmediate and window
        const originalSetImmediate = global.setImmediate;
        const originalWindow = global.window;

        // Mock window to simulate browser environment
        global.window = {};

        // Mock setImmediate to track if it's called
        let setImmediateCalled = false;
        global.setImmediate = function(callback: Function) {
            setImmediateCalled = true;
            return originalSetImmediate.call(global, callback);
        };

        // Force reload of Q to pick up our mocked environment
        delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
        const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

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
            // In the original code with window defined, setImmediate should be used
            // In the mutated code, it will always use the else branch (setTimeout)
            // So setImmediateCalled should be true in original, false in mutated
            expect(setImmediateCalled).toBe(true);
            expect(resolved).toBe(true);

            // Clean up
            global.setImmediate = originalSetImmediate;
            global.window = originalWindow;
            done();
        }, 100);
    });
});