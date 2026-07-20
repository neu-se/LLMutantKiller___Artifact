const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
    it("should correctly identify internal stack frames", () => {
        // This test directly targets the getFileNameAndLineNumber function
        // by testing the stack trace filtering functionality

        // Enable long stack support to trigger stack parsing
        Q.longStackSupport = true;

        // Create a promise that will generate internal stack frames
        return Q.Promise(function(resolve: any, reject: any) {
            // Create an error with a stack trace that should be filtered
            const error = new Error("Test error");

            // Simulate a stack trace with internal Q frames
            error.stack = "Error: Test error\n" +
                         "    at Q.Promise (" + __filename + ":10:15)\n" +
                         "    at testFunction (" + __filename + ":20:25)\n" +
                         "    at userCode (user-file.js:5:10)";

            reject(error);
        })
        .catch((e: Error) => {
            // Verify the error was caught
            expect(e.message).toBe("Test error");

            // The stack should be filtered to remove internal Q frames
            // If the mutation is present, getFileNameAndLineNumber will return []
            // which will break the isInternalFrame check and fail to filter stacks
            expect(e.stack).toBeDefined();

            // The filtered stack should not contain the internal Q frame
            // This assertion will fail if the mutation is present
            expect(e.stack!.includes("Q.Promise (" + __filename)).toBe(false);

            return "success";
        });
    });
});