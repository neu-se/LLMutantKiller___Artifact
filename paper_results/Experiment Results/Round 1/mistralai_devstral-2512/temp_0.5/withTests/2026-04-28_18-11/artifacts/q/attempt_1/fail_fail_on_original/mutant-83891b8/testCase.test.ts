// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-83891b8/testCase.test.ts

import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nearer behavior with fulfilled promises", () => {
    it("should return the fulfillment value when the promise is fulfilled", () => {
        const fulfilledPromise = Q.resolve(42);
        const result = Q.nearer(fulfilledPromise);
        expect(result).toBe(42);
    });
});