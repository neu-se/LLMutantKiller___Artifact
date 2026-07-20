import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress callback error handling", () => {
    it("should correctly track thrown errors in progress callbacks", async () => {
        const deferred = Q.defer();
        const testError = new Error("Test progress error");
        let errorCaught = false;

        deferred.promise.progress(() => {
            throw testError;
        });

        Q.onerror = (err: any) => {
            errorCaught = true;
        };

        deferred.notify();

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(errorCaught).toBe(true);
    });
});