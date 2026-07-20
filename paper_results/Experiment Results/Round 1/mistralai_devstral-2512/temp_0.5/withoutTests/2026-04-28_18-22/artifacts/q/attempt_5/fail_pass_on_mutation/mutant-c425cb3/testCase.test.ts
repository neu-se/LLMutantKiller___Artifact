// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c425cb3/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
    it("should notify progress when no exception is thrown in progress handler", (done) => {
        const deferred = Q.defer();
        let progressReceived = false;
        let progressValue: any = null;

        deferred.promise.then(
            () => {},
            () => {},
            (progress: any) => {
                progressReceived = true;
                progressValue = progress;
                return progress; // Return the progress value
            }
        );

        deferred.notify("test progress");

        setTimeout(() => {
            expect(progressReceived).toBe(true);
            expect(progressValue).toBe("test progress");
            done();
        }, 10);
    });
});