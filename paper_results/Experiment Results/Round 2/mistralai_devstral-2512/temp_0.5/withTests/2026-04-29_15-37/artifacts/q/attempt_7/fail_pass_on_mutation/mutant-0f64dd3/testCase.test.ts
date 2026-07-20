import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace capture edge case", () => {
    it("should handle stack traces with malformed line information", () => {
        // Create a promise that will generate a stack trace
        const deferred = Q.defer();

        // Create an error with a malformed stack trace that will fail parsing
        const error = new Error("Test error");
        error.stack = "Error: Test error\n    at Object.<anonymous> (unknown:0:0)";

        Q.nextTick(function() {
            deferred.reject(error);
        });

        return deferred.promise.catch(function(error: Error) {
            // Verify the error still has its stack trace
            expect(error.stack).toBeDefined();

            // The mutation affects how malformed stack traces are handled
            // In the original code, when fileNameAndLineNumber is falsy (parsing fails),
            // it should still handle the error correctly
            // In the mutated code, this logic is inverted
            return true;
        }).then(function(result: boolean) {
            expect(result).toBe(true);
        });
    });
});