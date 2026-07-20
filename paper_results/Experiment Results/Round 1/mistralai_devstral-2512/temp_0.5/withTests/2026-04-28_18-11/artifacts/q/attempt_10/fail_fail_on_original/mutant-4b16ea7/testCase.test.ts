describe("Q setImmediate detection", () => {
    it("should properly detect and use window.setImmediate in browser environment", () => {
        // Save original window
        const originalWindow = global.window;

        // Create a mock window with setImmediate
        const mockWindow = {
            setImmediateUsed: false,
            setImmediate: function(fn: Function) {
                this.setImmediateUsed = true;
                return fn();
            }
        };

        global.window = mockWindow as any;

        // Import Q after setting up the mock environment
        const Q = require('../../../../../../../../../../../subject_repositories/q/q.js');

        // Create a deferred and resolve it
        const deferred = Q.defer();
        let resolved = false;

        deferred.promise.then(() => {
            resolved = true;
        });

        deferred.resolve(42);

        // Restore original window
        global.window = originalWindow;

        // In original code: window.setImmediate should be used
        // In mutated code: window.setImmediate won't be used
        expect(mockWindow.setImmediateUsed).toBe(true);
        expect(resolved).toBe(true);
    });
});