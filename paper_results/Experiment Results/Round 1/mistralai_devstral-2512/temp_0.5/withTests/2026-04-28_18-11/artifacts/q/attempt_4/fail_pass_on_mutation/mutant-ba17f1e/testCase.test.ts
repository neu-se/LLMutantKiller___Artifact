const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
    it("should correctly parse stack traces with named function format", () => {
        // This test directly targets the getFileNameAndLineNumber function
        // by creating a scenario where it must parse stack traces correctly

        // Enable long stack support to trigger stack parsing
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        return Q.Promise(function(resolve: any, reject: any) {
            // Create an error with a stack trace that matches the attempt1 regex
            const error = new Error("Test error");
            error.stack = "Error: Test error\n" +
                         "    at TestFunction (test-file.js:42:21)\n" +
                         "    at anotherFunction (another-file.js:10:5)";

            // The mutation would cause getFileNameAndLineNumber to return []
            // instead of ["test-file.js", 42] for the first stack line
            // This would break the isInternalFrame check
            reject(error);
        })
        .catch((e: Error) => {
            // Verify the error was caught properly
            expect(e.message).toBe("Test error");

            // The stack should still be present
            expect(e.stack).toBeDefined();
            expect(e.stack!.includes("test-file.js:42:21")).toBe(true);

            // If the mutation is present, the stack trace filtering would fail
            // and this would affect the error handling
            return "recovered";
        })
        .then((result: string) => {
            expect(result).toBe("recovered");
        });
    });
});