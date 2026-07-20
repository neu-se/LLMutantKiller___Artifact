// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_3/pending_category/mutant-1beddf7/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.promise resolver execution", () => {
    it("should execute the resolver function when creating a promise", () => {
        let resolverExecuted = false;

        const promise = Q.promise((resolve: any, reject: any, notify: any) => {
            resolverExecuted = true;
            resolve(42);
        });

        return promise.then((value: any) => {
            expect(resolverExecuted).toBe(true);
            expect(value).toBe(42);
        });
    });
});