import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise rejection behavior", () => {
    it("should correctly handle thrown errors in progress callbacks", async () => {
        let errorThrown = false;
        const deferred = Q.defer();
        const error = new Error("Test error");

        deferred.promise.progress(() => {
            throw error;
        });

        Q.onerror = (err: any) => {
            errorThrown = true;
        };

        deferred.notify();

        await new Promise(resolve => setTimeout(resolve, 10));

        expect(errorThrown).toBe(true);
    });
});