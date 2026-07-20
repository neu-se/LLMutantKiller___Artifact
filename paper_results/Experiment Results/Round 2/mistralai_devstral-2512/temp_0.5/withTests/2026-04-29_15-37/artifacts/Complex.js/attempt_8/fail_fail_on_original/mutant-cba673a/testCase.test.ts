// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-cba673a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh function", () => {
  it("should compute cosh correctly for both real and imaginary components", () => {
    const z = new Complex(1, 1);
    const result = z.cosh();
    expect(result.re).toBeCloseTo(0.8337300251311491);
    expect(result.im).toBeCloseTo(1.969615506024416);
  });
});