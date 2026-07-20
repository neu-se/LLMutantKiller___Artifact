import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress callback error handling", () => {
    it("should correctly propagate errors from progress callbacks", async () => {
        const deferred = Q.defer();
        const testError = new Error("Test progress error");
        let errorPropagated = false;

        deferred.promise.progress(() => {
            throw testError;
        });

        Q.onerror = (err: any) => {
            errorPropagated = true;
        };

        deferred.notify();

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(errorPropagated).toBe(true);
    });
});