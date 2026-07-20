// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-63e4667/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys() mutation test", () => {
  it("should return correct keys for an object", async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keys = await Q(obj).keys();
    expect(keys).toEqual(["a", "b", "c"]);
  });
});