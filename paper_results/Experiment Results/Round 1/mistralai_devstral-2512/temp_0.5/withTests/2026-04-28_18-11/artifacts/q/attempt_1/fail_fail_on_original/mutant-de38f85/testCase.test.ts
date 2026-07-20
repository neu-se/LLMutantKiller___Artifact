// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-de38f85/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.keys", () => {
  it("should reject when called with an empty string as the operation name", async () => {
    const obj = { a: 1, b: 2 };
    const promise = Q(obj).keys();
    await expect(promise).rejects.toBeDefined();
  });
});