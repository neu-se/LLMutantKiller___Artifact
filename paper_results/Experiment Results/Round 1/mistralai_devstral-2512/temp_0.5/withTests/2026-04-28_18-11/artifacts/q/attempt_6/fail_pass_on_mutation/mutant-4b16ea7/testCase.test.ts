describe("setImmediate window binding", () => {
    it("should use window.setImmediate when available", (done) => {
        // Save original window and setImmediate
        const originalWindow = global.window;
        const originalSetImmediate = global.setImmediate;

        // Create a mock window with setImmediate
        const mockWindow = {
            setImmediate: function(fn: Function) {
                // This should be called in original code when window is detected
                fn();
            }
        };

        global.window = mockWindow as any;

        // Import Q after setting up the mock environment
        const Q = require('../../../../../../../../../../../subject_repositories/q/q.js');

        // Create a test that verifies the async behavior
        let executionOrder = [];

        executionOrder.push('start');

        Q.resolve().then(() => {
            executionOrder.push('promise');
        });

        // In original code, this should execute immediately due to window.setImmediate binding
        // In mutated code, it will use a different mechanism (setTimeout)
        setTimeout(() => {
            executionOrder.push('timeout');

            // Restore originals
            global.window = originalWindow;
            global.setImmediate = originalSetImmediate;

            // In original code, promise should execute before timeout
            // In mutated code, timeout might execute first
            expect(executionOrder).toEqual(['start', 'promise', 'timeout']);
            done();
        }, 0);
    });
});