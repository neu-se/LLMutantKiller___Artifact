describe("Q module environment detection", () => {
    it("should correctly handle browser environment detection", () => {
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
            const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");

            // Test case 2: Worker environment (self defined)
            delete globalAny.window;
            globalAny.self = {};

            // Clear cache and reload
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
            const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

            // Test case 3: Node.js environment (neither defined)
            delete globalAny.window;
            delete globalAny.self;

            // Clear cache and reload
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
            const Q3 = require("../../../../../../../../../../../subject_repositories/q/q.js");

            // All should be valid Q implementations
            expect(Q1).toBeDefined();
            expect(Q2).toBeDefined();
            expect(Q3).toBeDefined();

            // Test that they all work
            const d1 = Q1.defer();
            const d2 = Q2.defer();
            const d3 = Q3.defer();

            expect(d1).toBeDefined();
            expect(d2).toBeDefined();
            expect(d3).toBeDefined();

            // The critical test: Test promise functionality works in all cases
            return Q1.resolve(1)
                .then(value => {
                    expect(value).toBe(1);
                    return Q2.resolve(2);
                })
                .then(value => {
                    expect(value).toBe(2);
                    return Q3.resolve(3);
                })
                .then(value => {
                    expect(value).toBe(3);
                });
        } finally {
            // Restore original globals
            globalAny.window = originalWindow;
            globalAny.self = originalSelf;
        }
    });
});