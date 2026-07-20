// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("QReturnValue mutation test", () => {
    it("should handle generator return values correctly", () => {
        // This test verifies the behavior of Q.return() which depends on QReturnValue
        // The mutation changes the condition from checking typeof ReturnValue
        // to always being false, which affects how QReturnValue is defined

        // Create a simple async function that uses Q.return
        const testAsync = Q.async(function() {
            setTimeout(function() {
                Q["return"]("async result");
            }, 10);
        });

        // In the original code, this should resolve with "async result"
        // In the mutated code, this will fail because QReturnValue isn't properly defined
        return testAsync().then((result: any) => {
            expect(result).toBe("async result");
        });
    });
});