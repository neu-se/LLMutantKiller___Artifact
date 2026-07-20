describe("Q global exposure in browser environment", () => {
    it("should expose Q as global when window or self is defined", () => {
        // Save original globals
        const globalAny: any = global;
        const originalWindow = globalAny.window;
        const originalSelf = globalAny.self;
        const originalQ = globalAny.Q;

        try {
            // Simulate browser environment by defining window
            globalAny.window = {};
            delete globalAny.self;
            delete globalAny.Q;

            // Clear module cache to force fresh load
            const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
            delete require.cache[modulePath];

            // Load Q - this should expose it as global in browser environment
            const Q = require(modulePath);

            // The critical test: In browser environment, Q should be available as global
            // This will fail in the mutated version where the condition is always false
            expect(globalAny.Q).toBeDefined();
            expect(typeof globalAny.Q).toBe('function');

            // Verify it's the same Q we imported
            expect(globalAny.Q).toBe(Q);

            // Test basic functionality works
            const deferred = globalAny.Q.defer();
            expect(deferred).toBeDefined();
            expect(typeof deferred.resolve).toBe('function');

        } finally {
            // Restore original globals
            globalAny.window = originalWindow;
            globalAny.self = originalSelf;
            globalAny.Q = originalQ;
        }
    });
});