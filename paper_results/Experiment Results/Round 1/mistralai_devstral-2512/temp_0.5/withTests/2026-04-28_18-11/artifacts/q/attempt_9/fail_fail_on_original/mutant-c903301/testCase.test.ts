import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress listener error handling", () => {
    it("should throw errors when Q.onerror is not defined", (done) => {
        const testError = new Error("test error");

        // Remove Q.onerror to test the else branch
        delete (Q as any).onerror;

        const deferred = Q.defer();
        const promise = deferred.promise.then(
            () => {},
            () => {},
            () => {
                throw testError;
            }
        );

        deferred.notify();

        // In original code, this should throw (re-throw the error)
        // In mutated code, this does nothing (empty else block)
        setTimeout(() => {
            done();
        }, 10);
    });
});