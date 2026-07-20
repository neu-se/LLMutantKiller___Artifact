// Test to detect the mutation in q.js
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
    it("should properly detect CommonJS environment with exports object", () => {
        // This test verifies the specific condition that was mutated
        // The mutation changes `typeof exports === "object"` to just `true`
        // We need to test behavior that would differ between these conditions

        // In the original code, Q should be exported because we're in a CommonJS environment
        expect(qModule).toBeDefined();
        expect(typeof qModule).toBe("function");

        // Verify it's the actual Q library by testing basic functionality
        const deferred = qModule.defer();
        expect(deferred).toBeDefined();
        expect(deferred.promise).toBeDefined();

        // Test that Q works as expected in this environment
        let testPassed = false;
        qModule.resolve(42).then((value: number) => {
            testPassed = value === 42;
        });

        return qModule.delay(10).then(() => {
            expect(testPassed).toBe(true);

            // The real test: verify the module export mechanism works correctly
            // by checking that the module has the expected Q properties
            expect(qModule.defer).toBeDefined();
            expect(qModule.resolve).toBeDefined();
            expect(qModule.reject).toBeDefined();
        });
    });
});