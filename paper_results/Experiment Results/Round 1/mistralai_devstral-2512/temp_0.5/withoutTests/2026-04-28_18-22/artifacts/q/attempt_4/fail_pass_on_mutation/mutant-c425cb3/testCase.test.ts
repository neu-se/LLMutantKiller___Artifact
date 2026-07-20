// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c425cb3/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
    it("should not notify progress when an exception is thrown in progress handler", (done) => {
        const deferred = Q.defer();
        let progressReceived = false;
        let errorCaught = false;

        deferred.promise.then(
            () => {},
            () => {},
            (progress: any) => {
                throw new Error("Progress error");
            }
        );

        // Override the default error handler to catch the error
        const originalOnerror = Q.onerror;
        Q.onerror = (error: any) => {
            errorCaught = true;
            Q.onerror = originalOnerror;
        };

        deferred.notify("test progress");

        setTimeout(() => {
            expect(errorCaught).toBe(true);
            expect(progressReceived).toBe(false);
            Q.onerror = originalOnerror;
            done();
        }, 10);
    });
});