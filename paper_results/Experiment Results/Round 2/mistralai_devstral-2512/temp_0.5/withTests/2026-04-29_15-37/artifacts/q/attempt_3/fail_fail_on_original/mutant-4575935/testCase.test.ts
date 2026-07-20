describe("Q global exposure", () => {
    it("should expose Q when loaded in appropriate environment", () => {
        // Save original globals
        const globalAny: any = global;
        const originalWindow = globalAny.window;
        const originalSelf = globalAny.self;

        try {
            // Test case 1: With window defined (browser-like)
            globalAny.window = {};
            delete globalAny.self;

            // Clear cache and reload
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
            const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");

            // In browser environment, Q should be available as global
            expect(typeof globalAny.Q).toBe('function');

            // Test case 2: With self defined (worker-like)
            delete globalAny.window;
            globalAny.self = {};

            // Clear cache and reload
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
            const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

            // In worker environment, Q should be available as global
            expect(typeof globalAny.Q).toBe('function');

        } finally {
            // Restore original globals
            globalAny.window = originalWindow;
            globalAny.self = originalSelf;
            delete globalAny.Q;
        }
    });
});