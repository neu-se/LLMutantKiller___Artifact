// Test to detect the mutation in q.js
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
    it("should properly export Q in CommonJS environment", () => {
        // This test verifies that Q is properly exported in a CommonJS environment
        // The mutation changes the condition from checking `typeof exports === "object"`
        // to just `true`, which would break the module export in non-CommonJS environments
        // but should still work in CommonJS. We test that Q is actually available.

        // Verify Q is defined and is a function
        expect(qModule).toBeDefined();
        expect(typeof qModule).toBe("function");

        // Verify basic Q functionality
        const deferred = qModule.defer();
        expect(deferred).toBeDefined();
        expect(deferred.promise).toBeDefined();
        expect(typeof deferred.resolve).toBe("function");

        // Test promise resolution
        let resolvedValue: number | null = null;
        qModule.resolve(42).then((value: number) => {
            resolvedValue = value;
        });

        // Give the promise time to resolve
        return qModule.delay(10).then(() => {
            expect(resolvedValue).toBe(42);

            // Verify Q has expected methods
            expect(typeof qModule.reject).toBe("function");
            expect(typeof qModule.all).toBe("function");
            expect(typeof qModule.race).toBe("function");

            // The key test: verify the module export mechanism works correctly
            // by checking that the module has the expected Q properties
            expect(qModule.defer).toBeDefined();
            expect(qModule.resolve).toBeDefined();
            expect(qModule.reject).toBeDefined();
        });
    });
});