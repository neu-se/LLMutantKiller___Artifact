import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress callback error handling", () => {
    it("should correctly handle errors thrown in progress callbacks", async () => {
        const deferred = Q.defer();
        const testError = new Error("Test progress error");
        let errorHandled = false;

        deferred.promise.progress(() => {
            throw testError;
        });

        Q.onerror = (err: any) => {
            errorHandled = true;
        };

        deferred.notify();

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(errorHandled).toBe(true);
    });
});