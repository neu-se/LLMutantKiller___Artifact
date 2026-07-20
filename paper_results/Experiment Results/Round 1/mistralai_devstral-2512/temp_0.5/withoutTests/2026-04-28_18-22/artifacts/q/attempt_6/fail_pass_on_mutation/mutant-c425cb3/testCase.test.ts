// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c425cb3/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
    it("should handle progress notifications correctly when no exception occurs", (done) => {
        const deferred = Q.defer();
        let progressNotifications: any[] = [];

        deferred.promise.then(
            () => {},
            () => {},
            (progress: any) => {
                progressNotifications.push(progress);
                return progress;
            }
        );

        // Send multiple progress notifications
        deferred.notify("progress1");
        deferred.notify("progress2");
        deferred.notify("progress3");

        setTimeout(() => {
            expect(progressNotifications).toEqual(["progress1", "progress2", "progress3"]);
            done();
        }, 20);
    });
});