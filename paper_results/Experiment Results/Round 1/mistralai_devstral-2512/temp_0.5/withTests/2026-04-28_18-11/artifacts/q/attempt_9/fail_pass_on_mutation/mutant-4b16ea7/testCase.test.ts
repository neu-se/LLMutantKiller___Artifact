describe("Q promise timing", () => {
    it("should resolve promises immediately when setImmediate is available", (done) => {
        // Save original window and setImmediate
        const originalWindow = global.window;
        const originalSetImmediate = global.setImmediate;

        // Create a mock window with setImmediate
        const mockWindow = {
            setImmediate: function(fn: Function) {
                // Execute immediately to simulate setImmediate behavior
                fn();
            }
        };

        global.window = mockWindow as any;

        // Import Q after setting up the mock environment
        const Q = require('../../../../../../../../../../../subject_repositories/q/q.js');

        // Test the actual observable behavior
        let resolved = false;
        const startTime = Date.now();

        Q.resolve().then(() => {
            resolved = true;
            const endTime = Date.now();

            // In original code: should resolve very quickly (< 10ms)
            // In mutated code: will use setTimeout which takes at least 4ms
            const duration = endTime - startTime;

            // Restore originals
            global.window = originalWindow;
            global.setImmediate = originalSetImmediate;

            expect(resolved).toBe(true);
            expect(duration).toBeLessThan(10); // Should be immediate with setImmediate
            done();
        });
    });
});