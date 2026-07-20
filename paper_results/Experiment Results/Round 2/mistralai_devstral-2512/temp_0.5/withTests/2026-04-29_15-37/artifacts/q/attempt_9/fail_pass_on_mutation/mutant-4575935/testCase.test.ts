describe("Q module loading behavior", () => {
    it("should load Q correctly in different environments", () => {
        // Test 1: Load Q in Node.js environment (no window/self)
        delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
        const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");
        expect(Q1).toBeDefined();
        expect(typeof Q1).toBe('function');

        // Test 2: Load Q with window defined (browser simulation)
        const globalAny: any = global;
        const originalWindow = globalAny.window;
        globalAny.window = {};

        delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
        const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
        expect(Q2).toBeDefined();
        expect(typeof Q2).toBe('function');

        // Test 3: Load Q with self defined (worker simulation)
        delete globalAny.window;
        const originalSelf = globalAny.self;
        globalAny.self = {};

        delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
        const Q3 = require("../../../../../../../../../../../subject_repositories/q/q.js");
        expect(Q3).toBeDefined();
        expect(typeof Q3).toBe('function');

        // Restore original globals
        globalAny.window = originalWindow;
        globalAny.self = originalSelf;

        // The key test: All three should be valid Q implementations
        expect(typeof Q1.defer).toBe('function');
        expect(typeof Q2.defer).toBe('function');
        expect(typeof Q3.defer).toBe('function');

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
    });
});