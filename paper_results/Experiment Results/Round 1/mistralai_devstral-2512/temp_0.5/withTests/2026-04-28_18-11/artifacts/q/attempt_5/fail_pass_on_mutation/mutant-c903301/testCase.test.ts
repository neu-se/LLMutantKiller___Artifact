import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress listener error handling", () => {
    it("should properly handle errors thrown in progress listeners", (done) => {
        const testError = new Error("progress error");
        let errorHandled = false;

        Q.onerror = (error: Error) => {
            errorHandled = true;
            expect(error).toBe(testError);
            done();
        };

        const deferred = Q.defer();
        deferred.promise.then(
            () => {},
            () => {},
            () => {
                throw testError;
            }
        );

        deferred.notify();

        setTimeout(() => {
            if (!errorHandled) {
                done(new Error("Expected error to be handled by Q.onerror"));
            }
        }, 50);
    });
});