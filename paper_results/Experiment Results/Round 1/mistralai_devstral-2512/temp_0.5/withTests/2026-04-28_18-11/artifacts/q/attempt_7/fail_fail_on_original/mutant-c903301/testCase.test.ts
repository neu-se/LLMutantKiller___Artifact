import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress listener error handling", () => {
    it("should throw errors from progress listeners when Q.onerror is not defined", (done) => {
        const testError = new Error("test error");

        // Access Q through any to bypass TypeScript type checking
        const qAny = Q as any;
        qAny.onerror = undefined;

        const deferred = qAny.defer();
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