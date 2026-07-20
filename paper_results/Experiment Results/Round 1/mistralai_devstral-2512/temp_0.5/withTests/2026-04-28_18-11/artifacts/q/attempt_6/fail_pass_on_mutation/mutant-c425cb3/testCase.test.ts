import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification behavior", () => {
    it("should handle progress notifications correctly when listener throws", () => {
        const deferred = Q.defer();
        let progressCalled = false;
        let errorCaught = false;

        Q.onerror = (error: any) => {
            errorCaught = true;
        };

        deferred.promise.then(
            () => {
                expect(true).toBe(false);
            },
            () => {
                expect(true).toBe(false);
            },
            (value: any) => {
                progressCalled = true;
                throw new Error("Progress error");
            }
        );

        deferred.notify("test");
        deferred.resolve("done");

        return Q.delay(10).then(() => {
            expect(progressCalled).toBe(true);
            expect(errorCaught).toBe(true);
        });
    });
});