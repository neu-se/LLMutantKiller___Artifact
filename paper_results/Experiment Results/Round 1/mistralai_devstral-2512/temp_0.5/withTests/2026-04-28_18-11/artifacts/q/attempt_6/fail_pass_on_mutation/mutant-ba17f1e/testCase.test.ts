const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
    it("should preserve complete stack traces when long stack support is enabled", () => {
        // This test directly targets the getFileNameAndLineNumber function
        // by verifying stack traces are properly preserved

        // Enable long stack support
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        return Q.Promise(function(resolve: any, reject: any) {
            // Create an error with a specific stack format
            const error = new Error("Test error");
            error.stack = "Error: Test error\n" +
                         "    at TestFunction (test-file.js:42:21)\n" +
                         "    at anotherFunction (another-file.js:10:5)";

            // The mutation would cause getFileNameAndLineNumber to return []
            // instead of ["test-file.js", 42] for the first stack line
            // This would break stack trace handling
            reject(error);
        })
        .catch((e: Error) => {
            // Verify the error was caught
            expect(e.message).toBe("Test error");

            // The complete stack should be preserved
            expect(e.stack).toBeDefined();
            expect(e.stack!.includes("test-file.js:42:21")).toBe(true);
            expect(e.stack!.includes("another-file.js:10:5")).toBe(true);

            // Count the number of stack frames
            const stackLines = e.stack!.split('\n').filter(line => line.trim().startsWith('at '));
            expect(stackLines.length).toBeGreaterThanOrEqual(2);

            return "success";
        });
    });
});