// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c425cb3/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
    it("should notify progress when no exception is thrown in progress handler", (done) => {
        const deferred = Q.defer();
        let progressHandlerCalled = false;
        let deferredNotifyCalled = false;

        // Spy on deferred.notify
        const originalNotify = deferred.notify;
        deferred.notify = function(value: any) {
            deferredNotifyCalled = true;
            return originalNotify.call(this, value);
        };

        deferred.promise.then(
            () => {},
            () => {},
            (progress: any) => {
                progressHandlerCalled = true;
                return progress;
            }
        );

        deferred.notify("test progress");

        setTimeout(() => {
            expect(progressHandlerCalled).toBe(true);
            expect(deferredNotifyCalled).toBe(true);
            done();
        }, 10);
    });
});