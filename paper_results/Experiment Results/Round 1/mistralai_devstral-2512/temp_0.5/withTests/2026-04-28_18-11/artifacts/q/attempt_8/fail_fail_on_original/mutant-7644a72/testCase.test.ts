// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("QReturnValue mutation test", () => {
    it("should properly define QReturnValue when ReturnValue is available", () => {
        // This test directly checks the QReturnValue definition behavior
        // The mutation changes the condition from checking typeof ReturnValue
        // to always being false, which affects how QReturnValue is defined

        // First, let's check if QReturnValue exists and is a function
        expect(typeof Q.QReturnValue).toBe('function');

        // Create an instance to verify it works correctly
        const testValue = new Q.QReturnValue("test");
        expect(testValue.value).toBe("test");

        // Test that Q.return throws the correct type
        let caughtValue = null;
        try {
            Q["return"]("test return");
        } catch (e) {
            caughtValue = e;
        }

        expect(caughtValue).toBeInstanceOf(Q.QReturnValue);
        expect(caughtValue.value).toBe("test return");
    });
});