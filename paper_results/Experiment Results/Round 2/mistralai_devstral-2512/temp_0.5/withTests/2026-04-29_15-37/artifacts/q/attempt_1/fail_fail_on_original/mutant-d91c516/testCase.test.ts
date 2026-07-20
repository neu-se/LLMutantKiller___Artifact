// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-d91c516/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys function", () => {
  it("should return a promise for the keys of an object", async () => {
    const testObject = { a: 1, b: 2, c: 3 };
    const keys = await Q.keys(testObject);
    expect(keys).toEqual(["a", "b", "c"]);
  });
});