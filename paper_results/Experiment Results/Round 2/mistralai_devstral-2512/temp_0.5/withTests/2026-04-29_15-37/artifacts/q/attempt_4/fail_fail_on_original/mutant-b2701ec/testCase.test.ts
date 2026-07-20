// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-b2701ec/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise constructor with undefined inspect", () => {
    it("should use default inspect when inspect is undefined", () => {
        const promise = Q.Promise({ when: function(resolve: any) { resolve(42); } }, function(op: any, args: any) {
            return Q.reject(new Error("Operation not supported"));
        });
        return promise.then(function(value: any) {
            expect(value).toBe(42);
            expect(promise.inspect().state).toBe("fulfilled");
        });
    });
});