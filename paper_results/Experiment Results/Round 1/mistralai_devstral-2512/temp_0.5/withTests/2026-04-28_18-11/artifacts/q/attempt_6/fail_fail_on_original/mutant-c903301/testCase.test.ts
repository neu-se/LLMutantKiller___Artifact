import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress listener error handling", () => {
    it("should re-throw errors from progress listeners when Q.onerror is not defined", (done) => {
        const testError = new Error("test error");

        // Ensure Q.onerror is not defined
        Q.onerror = undefined;

        const deferred = Q.defer();
        const promise = deferred.promise.then(
            () => {},
            () => {},
            () => {
                throw testError;
            }
        );

        deferred.notify();

        // In the original code, this should throw an error
        // In the mutated code, this should not throw (empty else block)
        setTimeout(() => {
            done(new Error("Expected error to be thrown"));
        }, 10);
    });
});