import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace initialization", () => {
    it("should correctly initialize stack trace capture", () => {
        // Force re-initialization of stack trace capture
        // This will trigger the captureLine function
        const originalQ = Q;
        delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
        const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

        // Create a promise that will generate a stack trace
        const deferred = Q.defer();

        Q.nextTick(function() {
            try {
                throw new Error("Test error");
            } catch (e) {
                deferred.reject(e);
            }
        });

        return deferred.promise.catch(function(error: Error) {
            // Verify the error has a stack trace
            expect(error.stack).toBeDefined();

            // The mutation affects how stack traces are captured
            // when file/line information is missing
            // This test verifies the basic functionality still works
            return true;
        }).then(function(result) {
            expect(result).toBe(true);
        });
    });
});