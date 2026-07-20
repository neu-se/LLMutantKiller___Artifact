// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-ee7e761/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.delete", () => {
  it("should delete a property from the object", async () => {
    const obj = { a: 1, b: 2 };
    const promise = Q(obj).delete("a");
    await promise;
    expect(obj).toEqual({ b: 2 });
  });
});