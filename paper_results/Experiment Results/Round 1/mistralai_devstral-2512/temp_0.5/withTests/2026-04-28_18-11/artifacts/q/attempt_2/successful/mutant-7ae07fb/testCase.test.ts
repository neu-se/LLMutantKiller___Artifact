// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-7ae07fb/testCase.test.ts
import { promise } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("promise resolver validation", () => {
  it("should throw a TypeError with a descriptive message when resolver is not a function", () => {
    expect(() => {
      promise(undefined as any);
    }).toThrowError(TypeError);

    try {
      promise(undefined as any);
    } catch (error: any) {
      expect(error.message).toBe("resolver must be a function.");
    }
  });
});