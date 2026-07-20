describe("Q async mechanism", () => {
    it("should correctly detect browser environment for setImmediate", () => {
        // Save original window
        const originalWindow = global.window;

        // Mock a browser environment
        global.window = {
            setImmediate: function(fn: Function) {
                fn();
            }
        } as any;

        // Import Q after setting up the mock environment
        const Q = require('../../../../../../../../../../../subject_repositories/q/q.js');

        // Create a deferred and track if it resolves properly
        let resolved = false;
        const deferred = Q.defer();

        deferred.promise.then(() => {
            resolved = true;
        });

        deferred.resolve(42);

        // Restore original window
        global.window = originalWindow;

        // The test passes if the promise resolves correctly in browser environment
        expect(resolved).toBe(true);
    });
});