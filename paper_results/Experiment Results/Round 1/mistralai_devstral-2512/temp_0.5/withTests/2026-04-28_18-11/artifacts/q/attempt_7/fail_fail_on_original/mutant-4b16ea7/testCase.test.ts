describe("Q async scheduling", () => {
    it("should correctly bind setImmediate to window in browser environment", () => {
        // Save original window
        const originalWindow = global.window;

        // Create a mock window with setImmediate
        const mockWindow = {
            setImmediateCalled: false,
            setImmediate: function(fn: Function) {
                this.setImmediateCalled = true;
                fn();
            }
        };

        global.window = mockWindow as any;

        // Import Q after setting up the mock environment
        const Q = require('../../../../../../../../../../../subject_repositories/q/q.js');

        // Force Q to initialize its async mechanism
        const deferred = Q.defer();
        deferred.resolve();

        // Check if window.setImmediate was called
        // In original code: should be true (window detected)
        // In mutated code: should be false (condition always false)
        const setImmediateWasBound = mockWindow.setImmediateCalled;

        // Restore original window
        global.window = originalWindow;

        // This assertion will pass in original code and fail in mutated code
        expect(setImmediateWasBound).toBe(true);
    });
});