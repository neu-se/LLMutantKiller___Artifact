// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b403895/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return correct result for complex number with both real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.asec();
    expect(result.re).toBeCloseTo(0.443, 3);
    expect(result.im).toBeCloseTo(-1.061, 3);
  });
});