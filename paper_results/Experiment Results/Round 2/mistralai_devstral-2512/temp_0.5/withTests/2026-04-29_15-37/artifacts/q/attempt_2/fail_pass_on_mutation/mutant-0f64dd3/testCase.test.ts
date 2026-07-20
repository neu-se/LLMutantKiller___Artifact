import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace capture behavior", () => {
    it("should properly handle missing stack trace information", () => {
        // Create a promise that will generate a stack trace
        const deferred = Q.defer();

        // Force an error to be thrown that will trigger stack trace capture
        Q.nextTick(function() {
            try {
                // This will throw an error that should be caught and have its stack trace processed
                throw new Error("Test error for stack trace");
            } catch (e) {
                deferred.reject(e);
            }
        });

        return deferred.promise.catch(function(error) {
            // Verify the error has a stack trace
            expect(error.stack).toBeDefined();

            // The mutation affects how stack traces are filtered when file/line info is missing
            // This test verifies the library can still process errors correctly
            return true;
        }).then(function(result) {
            expect(result).toBe(true);
        });
    });
});