// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c425cb3/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
    it("should call deferred.notify when progress handler executes without throwing", (done) => {
        const deferred = Q.defer();
        let notifyCalled = false;

        // Spy on deferred.notify
        const originalNotify = deferred.notify;
        deferred.notify = function(value: any) {
            notifyCalled = true;
            return originalNotify.call(this, value);
        };

        deferred.promise.then(
            () => {},
            () => {},
            (progress: any) => {
                return progress; // No exception thrown
            }
        );

        deferred.notify("test progress");

        setTimeout(() => {
            expect(notifyCalled).toBe(true);
            done();
        }, 10);
    });
});