const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
    it("should correctly parse stack frames with named functions", () => {
        // This test directly targets the getFileNameAndLineNumber function
        // by testing the stack trace filtering functionality

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
            expect(e.stack!.includes("namedFunction (test-file.js:42:21)")).toBe(true);

            // Now test the actual stack frame identification
            // This will fail if getFileNameAndLineNumber returns []
            const testStackLine = "    at testFunc (test.js:100:1)";
            const result = Q._getFileNameAndLineNumber(testStackLine);

            // This assertion will fail with the mutation
            // because it would return [] instead of ["test.js", 100]
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(2);
            expect(result[0]).toBe("test.js");
            expect(result[1]).toBe(100);

            return "success";
        });
    });
});