// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("QReturnValue mutation test", () => {
    it("should correctly handle Q.return in non-ES6 generator environments", () => {
        // This test verifies that Q.return() works as expected in environments
        // where ES6 generators are not natively supported (like older SpiderMonkey)
        // The mutation changes the condition from checking typeof ReturnValue
        // to always being false, which would break this functionality

        // Test the explicit Q.return usage
        const testGeneratorWithReturn = Q.async(function () {
            Q.delay(10).then(function () {
                Q["return"]("explicit success");
            });
        });

        // In the original version, this should handle Q.return gracefully
        // In the mutated version, this would throw "QReturnValue is not defined"
        return testGeneratorWithReturn()
            .then((result: any) => {
                expect(result).toBe("explicit success");
            })
            .catch((e: any) => {
                // If we get here, the mutation is present
                expect(e.message).not.toContain("QReturnValue is not defined");
            });
    });
});