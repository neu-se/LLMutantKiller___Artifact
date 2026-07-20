// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3ebd6e3/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("allSettled behavior", () => {
    it("should return promise states for all input promises", () => {
        const fulfilledPromise = Q(42);
        const rejectedPromise = Q.reject(new Error("test error"));

        return Q.allSettled([fulfilledPromise, rejectedPromise])
            .then((result: any) => {
                expect(Array.isArray(result)).toBe(true);
                expect(result.length).toBe(2);
                expect(result[0].state).toBe("fulfilled");
                expect(result[0].value).toBe(42);
                expect(result[1].state).toBe("rejected");
            });
    });
});