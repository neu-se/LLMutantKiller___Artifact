// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("QReturnValue mutation test", () => {
    it("should correctly handle Q.return in generator functions", () => {
        // This test verifies that Q.return() works as expected
        // The mutation changes the condition from checking typeof ReturnValue
        // to always being false, which prevents proper QReturnValue handling

        // Create a generator function that uses Q.return
        const testGenerator = Q.async(function* () {
            yield Q.delay(10);
            Q["return"]("test result");
            return "should not reach here";
        });

        // In the original code, this should resolve with "test result"
        // In the mutated code, this would fail because QReturnValue isn't properly defined
        return testGenerator()
            .then((result: any) => {
                expect(result).toBe("test result");
            })
            .catch((e: any) => {
                // If we get here with a specific error, the mutation is present
                expect(e.message).not.toContain("QReturnValue is not defined");
                throw e; // Re-throw to fail the test if this is unexpected
            });
    });
});