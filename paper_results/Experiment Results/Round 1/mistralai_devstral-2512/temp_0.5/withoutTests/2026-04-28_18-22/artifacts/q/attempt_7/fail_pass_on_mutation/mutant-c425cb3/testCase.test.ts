// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c425cb3/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
    it("should notify progress when progress handler returns normally", (done) => {
        const deferred = Q.defer();
        let progressReceived = false;
        let notificationCount = 0;

        // Track notifications using deferred.notify
        const originalNotify = deferred.notify;
        deferred.notify = function(value: any) {
            notificationCount++;
            return originalNotify.call(this, value);
        };

        deferred.promise.then(
            () => {},
            () => {},
            (progress: any) => {
                progressReceived = true;
                return progress;
            }
        );

        deferred.notify("test");

        setTimeout(() => {
            expect(progressReceived).toBe(true);
            expect(notificationCount).toBe(1);
            done();
        }, 10);
    });
});