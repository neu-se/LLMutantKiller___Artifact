// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-738ecd8/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.join", () => {
  it("should return the value when promises resolve to the same value", async () => {
    const promise1 = Q.resolve(42);
    const promise2 = Q.resolve(42);
    const result = await promise1.join(promise2);
    expect(result).toBe(42);
  });
});