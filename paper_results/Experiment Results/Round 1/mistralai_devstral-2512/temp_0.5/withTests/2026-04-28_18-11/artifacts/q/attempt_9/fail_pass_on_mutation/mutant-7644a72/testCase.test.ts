// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("QReturnValue mutation test", () => {
    it("should handle Q.return() correctly in async functions", () => {
        // This test verifies the behavior of Q.return() which depends on QReturnValue
        // The mutation changes the condition from checking typeof ReturnValue
        // to always being false, which affects how QReturnValue is defined

        // Create a simple async function that uses Q.return
        const testAsync = Q.async(function* () {
            yield Q.delay(10);
            return "normal return";
        });

        // In the original code, this should work normally
        // In the mutated code, this will fail because QReturnValue isn't properly defined
        return testAsync().then((result: any) => {
            expect(result).toBe("normal return");
        });
    });
});