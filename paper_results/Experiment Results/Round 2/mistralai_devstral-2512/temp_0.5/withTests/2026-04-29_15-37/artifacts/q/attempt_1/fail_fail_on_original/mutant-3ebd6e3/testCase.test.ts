// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3ebd6e3/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("allSettled behavior", () => {
  it("should return promise states for all promises", async () => {
    const fulfilledPromise = Q.resolve(42);
    const rejectedPromise = Q.reject(new Error("test error"));
    const pendingPromise = Q.defer().promise;

    const result = await Q.allSettled([fulfilledPromise, rejectedPromise, pendingPromise]);

    expect(result).toEqual([
      { state: "fulfilled", value: 42 },
      { state: "rejected", reason: new Error("test error") },
      { state: "pending" }
    ]);
  });
});