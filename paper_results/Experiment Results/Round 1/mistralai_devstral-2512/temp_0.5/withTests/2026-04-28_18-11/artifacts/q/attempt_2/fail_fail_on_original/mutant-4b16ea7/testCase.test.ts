describe("setImmediate fallback", () => {
    it("should correctly use setImmediate when available", () => {
        // This test verifies that the library can properly detect and use setImmediate
        // when it's available in a browser-like environment

        // Save the original setImmediate
        const originalSetImmediate = global.setImmediate;

        // Create a mock setImmediate that we can track
        let setImmediateCalled = false;
        global.setImmediate = function(fn: Function) {
            setImmediateCalled = true;
            // Call the function to simulate setImmediate behavior
            fn();
        };

        // Mock window object to simulate browser environment
        const originalWindow = global.window;
        global.window = {} as any;

        // Import Q after setting up the mock environment
        const Q = require('../../../../../../../../../../../subject_repositories/q/q.js');

        // Create a test that should trigger the async scheduling
        const deferred = Q.defer();
        let resolved = false;

        deferred.promise.then(() => {
            resolved = true;
        });

        deferred.resolve(42);

        // Restore originals
        global.setImmediate = originalSetImmediate;
        global.window = originalWindow;

        // Verify that setImmediate was called (which means the original condition worked)
        expect(setImmediateCalled).toBe(true);
        expect(resolved).toBe(true);
    });
});