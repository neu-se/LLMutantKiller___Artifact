// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-b2701ec/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise constructor with descriptor", () => {
    it("should use default inspect function when inspect is undefined", () => {
        const promise = Q.makePromise({
            "when": function () {
                return "test";
            }
        });

        const inspection = promise.inspect();
        expect(inspection).toEqual({ state: "unknown" });
    });
});