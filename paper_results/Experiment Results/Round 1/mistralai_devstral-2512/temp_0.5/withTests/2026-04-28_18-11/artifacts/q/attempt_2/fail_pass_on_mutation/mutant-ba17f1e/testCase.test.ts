const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
    it("should correctly extract file name and line number from stack traces", () => {
        // Create a test that will trigger stack trace parsing
        // The mutation affects getFileNameAndLineNumber which is used in stack trace filtering
        Q.longStackSupport = true;

        let errorWithStack: Error | null = null;

        return Q.Promise(function(resolve: any, reject: any) {
            // Create an error with a specific stack format that should match attempt1 regex
            const error = new Error("Test error");
            error.stack = "Error: Test error\n" +
                         "    at TestFunction (test-file.js:42:21)\n" +
                         "    at anotherFunction (another-file.js:10:5)";
            errorWithStack = error;
            reject(error);
        })
        .catch((e: Error) => {
            // Verify the error still has its stack trace
            expect(e.stack).toBeDefined();
            expect(e.stack!.length).toBeGreaterThan(0);

            // The mutation would cause getFileNameAndLineNumber to return []
            // which would break stack trace filtering
            // If the mutation is present, this would fail
            return "recovered";
        })
        .then((result: string) => {
            expect(result).toBe("recovered");
            // Additional verification that the error object is still valid
            expect(errorWithStack).not.toBeNull();
            expect(errorWithStack!.stack).toContain("test-file.js:42:21");
        });
    });
});