// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-b2701ec/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise constructor inspect behavior", () => {
    it("should use default inspect when inspect parameter is undefined", () => {
        // Create a promise using Q.makePromise which is the internal constructor
        const promise = Q.makePromise(
            {
                when: function(resolve: any) {
                    resolve(42);
                }
            },
            function(op: any, args: any) {
                return Q.reject(new Error("Operation not supported"));
            }
        );

        return promise.then(function(value: any) {
            expect(value).toBe(42);
            // With the mutation, this would fail because inspect wouldn't be set properly
            const inspection = promise.inspect();
            expect(inspection).toBeDefined();
            expect(inspection.state).toBe("fulfilled");
            expect(inspection.value).toBe(42);
        });
    });
});