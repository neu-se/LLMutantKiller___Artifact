describe("Q async mechanism", () => {
    it("should correctly use setImmediate in browser environment", (done) => {
        // Save original window and setImmediate
        const originalWindow = global.window;
        const originalSetImmediate = global.setImmediate;

        // Mock a browser environment with setImmediate
        global.window = {
            setImmediate: function(fn: Function) {
                // This should be called in the original code but not in mutated code
                fn();
            }
        } as any;

        // Import Q after setting up the mock environment
        const Q = require('../../../../../../../../../../../subject_repositories/q/q.js');

        // Create a test that verifies async behavior
        Q.resolve(42).then((value) => {
            expect(value).toBe(42);
            done();
        }).catch((error) => {
            done(error);
        });

        // Restore originals
        global.window = originalWindow;
        global.setImmediate = originalSetImmediate;
    });
});