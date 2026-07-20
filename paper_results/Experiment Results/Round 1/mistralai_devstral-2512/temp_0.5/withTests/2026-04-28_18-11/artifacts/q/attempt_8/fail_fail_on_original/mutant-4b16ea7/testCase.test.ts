describe("Q async execution order", () => {
    it("should execute promises immediately when setImmediate is bound to window", (done) => {
        // Save original window and setImmediate
        const originalWindow = global.window;
        const originalSetImmediate = global.setImmediate;

        // Create a mock window with setImmediate that executes immediately
        const executionOrder: string[] = [];
        const mockWindow = {
            setImmediate: function(fn: Function) {
                executionOrder.push('setImmediate');
                fn();
            }
        };

        global.window = mockWindow as any;

        // Import Q after setting up the mock environment
        const Q = require('../../../../../../../../../../../subject_repositories/q/q.js');

        executionOrder.push('start');

        // Create a promise that should use window.setImmediate
        Q.resolve().then(() => {
            executionOrder.push('promise');

            // In original code: setImmediate should be called before promise resolves
            // In mutated code: setImmediate won't be bound to window
            expect(executionOrder).toEqual(['start', 'setImmediate', 'promise']);

            // Restore originals
            global.window = originalWindow;
            global.setImmediate = originalSetImmediate;
            done();
        });
    });
});