describe("Q module export behavior", () => {
    it("should properly export Q in browser-like environments", () => {
        // Save original globals
        const globalAny: any = global;
        const originalWindow = globalAny.window;
        const originalSelf = globalAny.self;
        const originalQ = globalAny.Q;

        try {
            // Simulate browser environment
            globalAny.window = {};
            delete globalAny.self;
            delete globalAny.Q;

            // Clear module cache to force fresh load
            const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
            delete require.cache[modulePath];

            // Load Q - this should expose it as global in browser environment
            const Q = require(modulePath);

            // The critical test: In browser environment, Q should be available both
            // as the module export AND as a global variable
            expect(Q).toBeDefined();
            expect(typeof Q).toBe('function');

            // This is the key assertion that will fail with the mutation:
            // In the original code, Q should be exposed as a global when window is defined
            // In the mutated code (where condition is always false), it won't be
            expect(globalAny.Q).toBe(Q);

            // Verify basic functionality works
            const deferred = Q.defer();
            expect(deferred).toBeDefined();

        } finally {
            // Restore original globals
            globalAny.window = originalWindow;
            globalAny.self = originalSelf;
            globalAny.Q = originalQ;
        }
    });
});