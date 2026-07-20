import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress listener error handling", () => {
    it("should throw errors from progress listeners when not handled", (done) => {
        const testError = new Error("test error");
        let errorCaught = false;

        Q.onerror = (error: Error) => {
            errorCaught = true;
            expect(error).toBe(testError);
            done();
        };

        const deferred = Q.defer();
        const promise = deferred.promise.then(
            () => {},
            () => {},
            () => {
                throw testError;
            }
        );

        deferred.notify();

        // Give time for the error to propagate
        setTimeout(() => {
            if (!errorCaught) {
                done(new Error("Error was not caught by Q.onerror"));
            }
        }, 10);
    });
});