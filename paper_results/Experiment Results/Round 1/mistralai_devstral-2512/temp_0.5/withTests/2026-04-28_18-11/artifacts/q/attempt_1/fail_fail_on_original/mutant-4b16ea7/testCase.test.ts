describe("setImmediate detection", () => {
    it("should use setImmediate when available in browser environment", (done) => {
        // Save original setImmediate and window
        const originalSetImmediate = global.setImmediate;
        const originalWindow = global.window;

        // Mock a browser environment with setImmediate
        global.window = {};
        global.setImmediate = (fn: Function) => {
            // Verify this is being called
            expect(typeof fn).toBe('function');
            // Call the function immediately to simulate setImmediate behavior
            fn();
            // Clean up
            global.setImmediate = originalSetImmediate;
            global.window = originalWindow;
            done();
        };

        // Import Q after setting up the mock environment
        const Q = require('../../../../../../../../../../../subject_repositories/q/q.js');

        // Create a simple test that should trigger the async scheduling
        const deferred = Q.defer();
        let resolved = false;

        deferred.promise.then(() => {
            resolved = true;
        });

        deferred.resolve(42);

        // The test will complete when setImmediate is called
    });
});