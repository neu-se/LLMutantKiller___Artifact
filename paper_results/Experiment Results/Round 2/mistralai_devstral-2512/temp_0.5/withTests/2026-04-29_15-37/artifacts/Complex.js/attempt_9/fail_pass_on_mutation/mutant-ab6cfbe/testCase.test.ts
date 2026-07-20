// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ab6cfbe/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should return correct log for exactly zero real part with zero imaginary part", () => {
    const result = new Complex(0, 0).log();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});