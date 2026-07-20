// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-b2701ec/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise constructor inspect behavior", () => {
    it("should use default inspect when inspect parameter is undefined", () => {
        // Create a fulfilled promise using Q.makePromise
        const promise = Q.makePromise(
            {
                when: function(resolve: any) {
                    return 42; // Return value directly
                }
            },
            function(op: any, args: any) {
                return Q.reject(new Error("Operation not supported"));
            }
        );

        // Test the inspect method directly
        const inspection = promise.inspect();
        expect(inspection).toBeDefined();
        expect(inspection.state).toBe("fulfilled");
        expect(inspection.value).toBe(42);
    });
});