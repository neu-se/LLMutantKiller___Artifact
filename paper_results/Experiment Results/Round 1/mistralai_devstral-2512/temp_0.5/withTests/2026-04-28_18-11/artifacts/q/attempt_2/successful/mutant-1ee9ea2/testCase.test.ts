// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-1ee9ea2/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async with generators", () => {
    it("should properly handle ES6 generator completion", () => {
        return Q.async(function* () {
            const value = yield Q(10);
            return value + 5;
        })().then(result => {
            expect(result).toBe(15);
        });
    });
});