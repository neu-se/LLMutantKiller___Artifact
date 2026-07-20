// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3ebd6e3/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("allSettled behavior", () => {
    it("should return promise states for all input promises", () => {
        const fulfilledPromise = Q(42);
        const rejectedPromise = Q.reject(new Error("test error"));
        const pendingPromise = Q.defer().promise;

        return Q.allSettled([fulfilledPromise, rejectedPromise, pendingPromise])
            .then((result: any) => {
                expect(Array.isArray(result)).toBe(true);
                expect(result.length).toBe(3);
                expect(result[0].state).toBe("fulfilled");
                expect(result[0].value).toBe(42);
                expect(result[1].state).toBe("rejected");
                expect(result[2].state).toBe("pending");
            });
    }, 10000);
});