// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c425cb3/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
    it("should notify progress when progress handler completes successfully", (done) => {
        const deferred = Q.defer();
        let progressValue: any = null;
        let notifyCalled = false;

        // Track deferred.notify calls
        const originalNotify = deferred.notify;
        deferred.notify = function(value: any) {
            notifyCalled = true;
            return originalNotify.call(this, value);
        };

        deferred.promise.then(
            () => {},
            () => {},
            (progress: any) => {
                progressValue = progress;
                return progress;
            }
        );

        deferred.notify("test");

        setTimeout(() => {
            expect(notifyCalled).toBe(true);
            expect(progressValue).toBe("test");
            done();
        }, 10);
    });
});