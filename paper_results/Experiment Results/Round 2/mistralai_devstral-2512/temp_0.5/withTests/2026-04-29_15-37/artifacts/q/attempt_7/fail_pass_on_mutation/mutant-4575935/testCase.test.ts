describe("Q module initialization", () => {
    it("should properly initialize Q in different environments", () => {
        // This test examines the actual module loading behavior
        // by testing multiple loads with different global configurations

        const globalAny: any = global;
        const originalWindow = globalAny.window;
        const originalSelf = globalAny.self;

        try {
            // Test 1: Load with neither window nor self defined (Node.js)
            delete globalAny.window;
            delete globalAny.self;
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
            const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");
            expect(Q1).toBeDefined();
            expect(typeof Q1).toBe('function');

            // Test 2: Load with window defined (browser simulation)
            globalAny.window = {};
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
            const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
            expect(Q2).toBeDefined();
            expect(typeof Q2).toBe('function');

            // Test 3: Load with self defined (worker simulation)
            delete globalAny.window;
            globalAny.self = {};
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
            const Q3 = require("../../../../../../../../../../../subject_repositories/q/q.js");
            expect(Q3).toBeDefined();
            expect(typeof Q3).toBe('function');

            // The critical test: All three should be valid Q implementations
            // and should work correctly
            const d1 = Q1.defer();
            const d2 = Q2.defer();
            const d3 = Q3.defer();

            expect(d1).toBeDefined();
            expect(d2).toBeDefined();
            expect(d3).toBeDefined();

            // Test that promises work in all cases
            return Q1.resolve(true).then(function(value) {
                expect(value).toBe(true);
                return Q2.resolve(true);
            }).then(function(value) {
                expect(value).toBe(true);
                return Q3.resolve(true);
            }).then(function(value) {
                expect(value).toBe(true);
            });
        } finally {
            globalAny.window = originalWindow;
            globalAny.self = originalSelf;
        }
    });
});