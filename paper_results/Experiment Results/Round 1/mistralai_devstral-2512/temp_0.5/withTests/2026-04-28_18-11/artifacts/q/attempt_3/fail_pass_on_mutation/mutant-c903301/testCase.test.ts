import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress listener error handling", () => {
    it("should re-throw errors thrown by progress listeners", (done) => {
        const testError = new Error("test error");
        let errorThrown = false;

        Q.onerror = (error: Error) => {
            errorThrown = true;
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
    });
});