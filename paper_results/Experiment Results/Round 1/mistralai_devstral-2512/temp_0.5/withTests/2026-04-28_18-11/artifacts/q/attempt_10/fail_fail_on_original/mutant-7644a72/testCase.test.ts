// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("QReturnValue mutation test", () => {
    it("should properly handle QReturnValue in generator functions", () => {
        // This test verifies the behavior of Q.return() which depends on QReturnValue
        // The mutation changes the condition from checking typeof ReturnValue
        // to always being false, which affects how QReturnValue is defined

        // Create a generator function that uses Q.return
        const testGenerator = Q.async(function* () {
            yield Q.delay(10);
            Q["return"]("generator result");
            return "should not reach here";
        });

        // In the original code, this should resolve with "generator result"
        // In the mutated code, this will fail because QReturnValue isn't properly defined
        return testGenerator().then((result: any) => {
            expect(result).toBe("generator result");
        });
    });
});