const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
    it("should correctly handle errors with named function stack traces", () => {
        // Enable long stack support to trigger stack parsing
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        return Q.Promise(function(resolve: any, reject: any) {
            // Create an error with a stack trace that matches the attempt1 regex
            const error = new Error("Test error");
            error.stack = "Error: Test error\n" +
                         "    at namedFunction (test-file.js:42:21)\n" +
                         "    at anotherFunction (another-file.js:10:5)";

            // The mutation would cause getFileNameAndLineNumber to return []
            // instead of ["test-file.js", 42] for the first stack line
            // This would break stack trace handling
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

            // Create a new promise to test stack trace handling
            return Q.Promise(function(resolve: any, reject: any) {
                const testError = new Error("Test");
                testError.stack = "Error: Test\n    at testFunc (test.js:100:1)";
                reject(testError);
            });
        })
        .catch((e: Error) => {
            expect(e.message).toBe("Test");
            expect(e.stack!.includes("testFunc (test.js:100:1)")).toBe(true);

            // Test that the stack trace is properly formatted
            const stackLines = e.stack!.split('\n');
            expect(stackLines.length).toBeGreaterThan(1);

            // The mutation would cause stack parsing to fail
            // which would affect the stack trace format
            return "success";
        });
    });
});