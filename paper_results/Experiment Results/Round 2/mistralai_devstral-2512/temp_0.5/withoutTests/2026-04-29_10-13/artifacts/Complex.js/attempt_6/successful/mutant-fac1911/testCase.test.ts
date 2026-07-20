// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fac1911/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should compute acsch correctly for (0,1) and not produce NaN", () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    // The original code should handle (0,1) case properly
    // The mutation (a/a) would cause division by zero when a=0
    expect(result.isNaN()).toBe(false);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI/2, 10);
  });
});