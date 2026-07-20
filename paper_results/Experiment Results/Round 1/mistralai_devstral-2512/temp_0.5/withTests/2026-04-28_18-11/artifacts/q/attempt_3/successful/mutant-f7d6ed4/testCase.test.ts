import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method with domain", () => {
    it("should handle errors correctly when process.domain exists", (done) => {
        // Create a deferred promise
        const deferred = Q.defer();
        const error = new Error("test error");

        // Set up error handler
        Q.onerror = (err: any) => {
            expect(err).toBe(error);
            done();
        };

        // Call done() which should set up the domain binding
        deferred.promise.done();

        // Reject the promise
        deferred.reject(error);
    });
});