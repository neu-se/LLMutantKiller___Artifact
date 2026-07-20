import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress listener error handling", () => {
    it("should re-throw errors thrown by progress listeners to Q.onerror", (done) => {
        const testError = new Error("test error");
        let onErrorCalled = false;

        Q.onerror = (error) => {
            onErrorCalled = true;
            expect(error).toBe(testError);
            done();
        };

        const deferred = Q.defer();
        deferred.promise.progress(() => {
            throw testError;
        });

        deferred.notify();
    });
});