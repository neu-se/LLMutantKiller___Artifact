import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress callback error handling", () => {
    it("should correctly track thrown errors in progress callbacks", async () => {
        const deferred = Q.defer();
        const testError = new Error("Test progress error");
        let errorCaught = false;
        let errorInstance: Error | null = null;

        deferred.promise.progress(() => {
            throw testError;
        });

        Q.onerror = (err: any) => {
            errorCaught = true;
            errorInstance = err;
        };

        deferred.notify();

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(errorCaught).toBe(true);
        expect(errorInstance).toBe(testError);
    });
});