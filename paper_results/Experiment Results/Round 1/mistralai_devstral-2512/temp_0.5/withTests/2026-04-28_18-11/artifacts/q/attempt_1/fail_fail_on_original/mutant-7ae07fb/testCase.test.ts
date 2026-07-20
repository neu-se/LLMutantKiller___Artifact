// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-7ae07fb/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise resolver validation", () => {
  it("should throw a TypeError with a descriptive message when resolver is not a function", () => {
    expect(() => {
      Q.promise(undefined as any);
    }).toThrowError(TypeError);

    try {
      Q.promise(undefined as any);
    } catch (error) {
      expect(error.message).toBe("resolver must be a function.");
    }
  });
});