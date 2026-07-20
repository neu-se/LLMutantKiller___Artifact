import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.onerror called when progress callback throws", () => {
    it("should call Q.onerror when a progress callback throws an error", (done) => {
        const originalOnerror = Q.onerror;
        const thrownError = new Error("progress error");
        const caughtErrors: Error[] = [];

        Q.onerror = function (err: Error) {
            caughtErrors.push(err);
        };

        const deferred = Q.defer();

        deferred.promise.then(
            null,
            null,
            function (value: any) {
                throw thrownError;
            }
        );

        // Notify progress to trigger the progress callback
        deferred.notify("progress value");

        // Give time for async operations to complete
        setTimeout(function () {
            Q.onerror = originalOnerror;
            try {
                expect(caughtErrors).toContain(thrownError);
                done();
            } catch (e) {
                done(e);
            }
        }, 100);
    });
});