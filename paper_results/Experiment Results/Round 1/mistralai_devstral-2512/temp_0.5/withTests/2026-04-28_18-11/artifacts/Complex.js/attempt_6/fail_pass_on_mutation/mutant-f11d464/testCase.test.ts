// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f11d464/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly compute power for fully imaginary base with exponent 4", () => {
    const base = new Complex(0, 2);
    const exponent = new Complex(4, 0);
    const result = base.pow(exponent);
    // (0 + 2i)^4 = 16
    expect(result.re).toBeCloseTo(16);
    expect(result.im).toBeCloseTo(0);
  });
});