// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fe2848f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly handle purely imaginary numbers", () => {
    const result = new Complex(0, 0.5).atanh();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0.4636476090008061);
  });
});