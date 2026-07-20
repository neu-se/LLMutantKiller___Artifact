import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise error handling", () => {
    it("should properly handle errors thrown in progress callbacks", async () => {
        let errorHandled = false;
        const deferred = Q.defer();
        const testError = new Error("Progress error");

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