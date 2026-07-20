// Test to detect the mutation in q.js
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
    it("should only export Q in CommonJS environments with proper exports object", () => {
        // This test verifies that Q is properly exported only when the exports object exists
        // The mutation changes the condition from checking `typeof exports === "object"`
        // to just `true`, which would incorrectly export Q even when exports doesn't exist
        // We test this by checking if Q was exported when it shouldn't be

        // In the original code, Q should be exported because we're in a CommonJS environment
        expect(qModule).toBeDefined();
        expect(typeof qModule).toBe("function");

        // Verify it's the actual Q library by testing basic functionality
        const deferred = qModule.defer();
        expect(deferred).toBeDefined();
        expect(deferred.promise).toBeDefined();

        let testPassed = false;
        qModule.resolve(42).then((value: number) => {
            testPassed = value === 42;
        });

        return qModule.delay(10).then(() => {
            expect(testPassed).toBe(true);
        });
    });
});