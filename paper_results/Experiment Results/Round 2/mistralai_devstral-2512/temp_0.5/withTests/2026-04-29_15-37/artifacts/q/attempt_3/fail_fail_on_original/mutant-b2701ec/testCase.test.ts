// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-b2701ec/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise constructor with descriptor", () => {
    it("should create a promise with a descriptor and fallback", () => {
        const descriptor = {
            when: function(resolve) {
                resolve(42);
            }
        };
        const fallback = function(op, args) {
            return Q.reject(new Error("Operation not supported"));
        };
        const promise = Q.Promise(descriptor, fallback);
        return promise.then(function(value) {
            expect(value).toBe(42);
        });
    });
});