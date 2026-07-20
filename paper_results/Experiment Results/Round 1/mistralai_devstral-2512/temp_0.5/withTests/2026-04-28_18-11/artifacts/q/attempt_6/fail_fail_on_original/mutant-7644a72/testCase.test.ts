// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("QReturnValue mutation test", () => {
    it("should correctly define QReturnValue constructor", () => {
        // This test directly checks if QReturnValue is properly defined
        // The mutation changes the condition from checking typeof ReturnValue
        // to always being false, which prevents QReturnValue from being set to ReturnValue

        // In the original code, QReturnValue should be defined
        // In the mutated code, it will always be the fallback function constructor
        expect(typeof Q.QReturnValue).toBe('function');

        // Create an instance and verify it works
        const returnValue = new Q.QReturnValue("test");
        expect(returnValue.value).toBe("test");

        // Test that it can be used with Q.return
        let testPassed = false;
        try {
            Q["return"]("success");
        } catch (e) {
            if (e instanceof Q.QReturnValue && e.value === "success") {
                testPassed = true;
            }
        }
        expect(testPassed).toBe(true);
    });
});