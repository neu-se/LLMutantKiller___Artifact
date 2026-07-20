import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise rejection behavior", () => {
    it("should correctly track thrown errors in progress callbacks", async () => {
        let errorCaught = false;
        const deferred = Q.defer();
        const testError = new Error("Test error");

        deferred.promise.progress(() => {
            throw testError;
        });

        Q.onerror = (err: any) => {
            errorCaught = true;
        };

        deferred.notify();

        await new Promise(resolve => setTimeout(resolve, 50));

        expect(errorCaught).toBe(true);
    });
});