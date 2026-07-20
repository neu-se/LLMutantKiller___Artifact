// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-1beddf7/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise resolver execution", () => {
    it("should execute the resolver function when creating a promise", () => {
        let resolverExecuted = false;

        const promise = new Q.Promise((resolve: any, reject: any, notify: any) => {
            resolverExecuted = true;
            resolve(42);
        });

        return promise.then((value: any) => {
            expect(resolverExecuted).toBe(true);
            expect(value).toBe(42);
        });
    });
});