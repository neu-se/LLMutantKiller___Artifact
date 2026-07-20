// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c425cb3/testCase.test.ts
import { Q } from "./q.js";

describe("Promise progress notification", () => {
    it("should notify progress when no exception is thrown", (done) => {
        const deferred = Q.defer();
        let progressReceived = false;

        deferred.promise.then(
            () => {},
            () => {},
            (progress) => {
                progressReceived = true;
            }
        );

        deferred.notify("test progress");

        setTimeout(() => {
            expect(progressReceived).toBe(true);
            done();
        }, 10);
    });
});