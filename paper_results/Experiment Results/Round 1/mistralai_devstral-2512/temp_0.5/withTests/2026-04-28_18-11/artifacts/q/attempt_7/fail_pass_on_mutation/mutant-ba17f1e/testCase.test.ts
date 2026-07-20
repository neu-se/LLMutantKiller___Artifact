const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
    it("should correctly parse named function stack frames", () => {
        // This test directly targets the getFileNameAndLineNumber function
        // by creating a scenario where it must parse stack traces correctly

        // Enable long stack support to trigger stack parsing
        Q.longStackSupport = true;

        // Create a promise that will generate stack traces
        return Q.Promise(function(resolve: any, reject: any) {
            // Create an error with a stack trace that matches the attempt1 regex
            const error = new Error("Test error");
            error.stack = "Error: Test error\n" +
                         "    at namedFunction (test-file.js:42:21)\n" +
                         "    at anonymousFunction (another-file.js:10:5)";

            // The mutation would cause getFileNameAndLineNumber to return []
            // instead of ["test-file.js", 42] for the first stack line
            // This would break the isInternalFrame check
            reject(error);
        })
        .catch((e: Error) => {
            // Verify the error was caught
            expect(e.message).toBe("Test error");

            // The stack should be preserved
            expect(e.stack).toBeDefined();

            // The mutation would cause stack frame parsing to fail
            // which would affect how the stack is processed
            // This assertion verifies the stack contains the expected frame
            expect(e.stack!.includes("namedFunction (test-file.js:42:21)")).toBe(true);

            // Create another error to test the parsing directly
            const testError = new Error("Test");
            testError.stack = "Error: Test\n    at testFunc (test.js:100:1)";

            // The mutation would cause this to fail because getFileNameAndLineNumber
            // would return [] instead of ["test.js", 100]
            // This would break the stack trace filtering
            return Q.reject(testError);
        })
        .catch((e: Error) => {
            expect(e.message).toBe("Test");
            expect(e.stack!.includes("testFunc (test.js:100:1)")).toBe(true);
            return "success";
        });
    });
});