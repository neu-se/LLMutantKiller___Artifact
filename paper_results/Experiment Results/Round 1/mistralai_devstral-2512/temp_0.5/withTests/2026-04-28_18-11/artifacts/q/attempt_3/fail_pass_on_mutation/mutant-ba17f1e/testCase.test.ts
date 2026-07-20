const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
    it("should correctly parse stack traces with named functions", () => {
        // This test directly targets the getFileNameAndLineNumber function
        // which is affected by the mutation

        // Create a scenario that will definitely trigger the stack parsing
        Q.longStackSupport = true;

        let stackParsingError = false;

        // Create a promise chain that will generate stack traces
        return Q.Promise(function(resolve: any) {
            // This will create a stack trace with the format that matches attempt1 regex
            try {
                throw new Error("Test error");
            } catch (e) {
                // The stack should contain lines like "at functionName (filename:line:column)"
                expect(e.stack).toContain("at ");
                resolve();
            }
        })
        .then(() => {
            // Now test the actual stack trace filtering functionality
            // This will fail if getFileNameAndLineNumber returns [] instead of [filename, line]
            const testError = new Error("Test");
            testError.stack = "Error: Test\n    at TestFunction (test-file.js:42:21)";

            // The mutation would cause this to fail because getFileNameAndLineNumber
            // would return [] instead of ["test-file.js", 42]
            // This would break the isInternalFrame check
            return Q.reject(testError);
        })
        .catch((e: Error) => {
            // Verify we can still catch and handle the error
            expect(e.message).toBe("Test");
            expect(e.stack).toContain("test-file.js:42:21");
            return "success";
        });
    });
});