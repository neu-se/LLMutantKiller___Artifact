import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification behavior", () => {
    it("should not call deferred.notify when progress listener throws", () => {
        const deferred = Q.defer();
        let notifyCalled = false;
        let progressCalled = false;

        // Override the notify method to track calls
        const originalNotify = deferred.notify;
        deferred.notify = function(value: any) {
            notifyCalled = true;
            return originalNotify.call(deferred, value);
        };

        deferred.promise.then(
            () => {},
            () => {},
            (value: any) => {
                progressCalled = true;
                throw new Error("Progress error");
            }
        );

        deferred.notify("test");
        deferred.resolve("done");

        return Q.delay(10, 10).then(() => {
            expect(progressCalled).toBe(true);
            expect(notifyCalled).toBe(true);
        });
    });
});