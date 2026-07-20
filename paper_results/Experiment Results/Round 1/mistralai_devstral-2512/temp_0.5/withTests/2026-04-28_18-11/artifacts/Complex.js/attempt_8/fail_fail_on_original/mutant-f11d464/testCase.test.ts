// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f11d464/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly compute power for fully imaginary base with fractional exponent", () => {
    const base = new Complex(0, 4);
    const exponent = new Complex(0.5, 0);
    const result = base.pow(exponent);
    // (0 + 4i)^0.5 = 2 + 2i (principal root)
    expect(result.re).toBeCloseTo(2);
    expect(result.im).toBeCloseTo(2);
  });
});