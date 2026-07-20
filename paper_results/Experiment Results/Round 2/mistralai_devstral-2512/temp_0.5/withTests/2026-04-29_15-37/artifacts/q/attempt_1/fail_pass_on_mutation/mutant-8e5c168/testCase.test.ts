// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-8e5c168/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.Promise constructor", () => {
  it("should throw TypeError when resolver is not a function", () => {
    expect(() => {
      new Q.Promise("not a function");
    }).toThrow(TypeError);
  });
});