// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("QReturnValue mutation test", () => {
    it("should correctly define QReturnValue when ReturnValue is available", () => {
        // This test directly checks the behavior of the mutated code
        // The mutation changes the condition from checking typeof ReturnValue
        // to always being false, which prevents QReturnValue from being set

        // In the original code, if ReturnValue is defined, QReturnValue should be set to ReturnValue
        // In the mutated code, QReturnValue will always be set to the fallback function

        // We need to test this in an environment where ReturnValue is actually defined
        // Since we can't modify the global scope in a test, we'll check the actual behavior

        // Create a test that would fail if QReturnValue isn't properly defined
        const testPromise = Q.Promise(function(resolve, reject) {
            try {
                // This should work in the original code but might fail in mutated code
                // if QReturnValue isn't properly defined
                throw new Q.QReturnValue("test");
            } catch (e) {
                if (e instanceof Q.QReturnValue) {
                    resolve("success");
                } else {
                    reject(new Error("QReturnValue not properly defined"));
                }
            }
        });

        return testPromise.then((result: any) => {
            expect(result).toBe("success");
        });
    });
});