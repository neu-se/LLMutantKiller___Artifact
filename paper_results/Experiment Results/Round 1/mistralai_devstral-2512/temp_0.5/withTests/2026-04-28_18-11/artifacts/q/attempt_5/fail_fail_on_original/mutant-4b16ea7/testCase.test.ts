describe("setImmediate window binding", () => {
    it("should bind setImmediate to window in browser environment", () => {
        // Save original window
        const originalWindow = global.window;

        // Mock a browser environment with setImmediate
        const mockWindow = {
            setImmediate: function(fn: Function) {
                fn();
            }
        };

        global.window = mockWindow as any;

        // Import Q after setting up the mock environment
        const Q = require('../../../../../../../../../../../subject_repositories/q/q.js');

        // Check if setImmediate was properly bound to window
        // In the original code, this should work because the condition checks for window
        // In the mutated code, this will fail because the condition is always false
        const deferred = Q.defer();
        let testPassed = false;

        deferred.promise.then(() => {
            testPassed = true;
        });

        deferred.resolve(42);

        // Restore original window
        global.window = originalWindow;

        // The test should pass in original code (setImmediate bound to window)
        // and fail in mutated code (setImmediate not bound to window)
        expect(testPassed).toBe(true);
    });
});