// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a47801d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atan", () => {
  it("should return Infinity for atan(0, 1)", () => {
    const result = new Complex(0, 1).atan();
    expect(result.im).toBe(Infinity);
  });
});