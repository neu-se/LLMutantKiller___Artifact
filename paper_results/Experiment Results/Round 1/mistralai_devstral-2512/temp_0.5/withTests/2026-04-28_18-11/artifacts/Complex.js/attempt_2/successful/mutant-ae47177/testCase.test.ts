// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ae47177/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atan", () => {
  it("should return (0, Infinity) when input is (0, 1)", () => {
    const result = new Complex(0, 1).atan();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});