// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-1ee9ea2/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with ES6 generators", () => {
    it("should handle generator completion with return value", async () => {
        const result = await Q.async(function* () {
            const value = yield Q(10);
            return value + 5;
        })();
        expect(result).toBe(15);
    });
});