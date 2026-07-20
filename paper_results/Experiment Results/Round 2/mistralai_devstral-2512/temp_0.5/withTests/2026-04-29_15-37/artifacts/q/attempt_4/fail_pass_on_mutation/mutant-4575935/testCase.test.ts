describe("Q module environment detection", () => {
    it("should correctly detect browser environment", () => {
        // We need to test the actual module loading behavior
        // by examining what gets exported in different environments

        // Save original globals
        const globalAny: any = global;
        const originalWindow = globalAny.window;
        const originalSelf = globalAny.self;

        try {
            // Test case 1: Browser environment (window defined)
            globalAny.window = {};
            delete globalAny.self;

            // Clear cache and reload
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
            const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

            // The module should export Q properly
            expect(Q).toBeDefined();
            expect(typeof Q).toBe('function');

            // Test basic functionality works
            const deferred = Q.defer();
            expect(deferred).toBeDefined();

            // Test case 2: Worker environment (self defined)
            delete globalAny.window;
            globalAny.self = {};

            // Clear cache and reload
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
            const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

            // The module should still export Q properly
            expect(Q2).toBeDefined();
            expect(typeof Q2).toBe('function');

        } finally {
            // Restore original globals
            globalAny.window = originalWindow;
            globalAny.self = originalSelf;
        }
    });
});