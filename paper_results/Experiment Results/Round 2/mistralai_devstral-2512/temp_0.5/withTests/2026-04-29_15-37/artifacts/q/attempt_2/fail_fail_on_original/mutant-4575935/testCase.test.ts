describe("Q library initialization", () => {
    it("should properly initialize Q in a browser-like environment", () => {
        // Save original globals
        const globalAny: any = global;
        const originalWindow = globalAny.window;
        const originalSelf = globalAny.self;
        const originalQ = globalAny.Q;

        // Clean up
        delete globalAny.window;
        delete globalAny.self;
        delete globalAny.Q;

        try {
            // Create a mock browser environment
            globalAny.window = {};
            globalAny.self = undefined;

            // Load Q - this should expose Q as a global in browser environment
            const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

            // The key test: Q should be available as a global when window is defined
            expect(typeof globalAny.Q).toBe('function');

            // Verify it's the same Q we imported
            expect(globalAny.Q).toBe(Q);

            // Verify basic Q functionality works
            const deferred = globalAny.Q.defer();
            expect(deferred).toBeDefined();
            expect(typeof deferred.resolve).toBe('function');
            expect(typeof deferred.reject).toBe('function');

        } finally {
            // Restore original globals
            globalAny.window = originalWindow;
            globalAny.self = originalSelf;
            globalAny.Q = originalQ;
        }
    });
});