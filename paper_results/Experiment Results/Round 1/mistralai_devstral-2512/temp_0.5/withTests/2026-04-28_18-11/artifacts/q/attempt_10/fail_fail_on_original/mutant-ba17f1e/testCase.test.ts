const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
    it("should correctly identify and filter internal stack frames", () => {
        // Enable long stack support to trigger stack parsing
        Q.longStackSupport = true;

        // Create a promise that will generate stack traces
        return Q.Promise(function(resolve: any, reject: any) {
            // Create an error with a stack trace that should be filtered
            const error = new Error("Test error");
            error.stack = "Error: Test error\n" +
                         "    at Q.Promise (q.js:100:15)\n" +
                         "    at testFunction (user-code.js:42:21)";

            // The mutation would cause getFileNameAndLineNumber to return []
            // instead of ["q.js", 100] for the Q.Promise frame
            // This would break the isInternalFrame check
            reject(error);
        })
        .catch((e: Error) => {
            // Verify the error was caught
            expect(e.message).toBe("Test error");

            // The stack should be filtered to remove internal Q frames
            // If the mutation is present, this filtering will fail
            expect(e.stack).toBeDefined();

            // Count the number of stack frames
            const stackLines = e.stack!.split('\n').filter(line => line.trim().startsWith('at '));
            expect(stackLines.length).toBeGreaterThan(0);

            // The filtered stack should not contain the internal Q frame
            // This assertion will fail if the mutation is present
            const hasInternalFrame = stackLines.some(line =>
                line.includes("Q.Promise (q.js:100:15)")
            );
            expect(hasInternalFrame).toBe(false);

            // But should contain the user code frame
            const hasUserFrame = stackLines.some(line =>
                line.includes("testFunction (user-code.js:42:21)")
            );
            expect(hasUserFrame).toBe(true);

            return "success";
        });
    });
});