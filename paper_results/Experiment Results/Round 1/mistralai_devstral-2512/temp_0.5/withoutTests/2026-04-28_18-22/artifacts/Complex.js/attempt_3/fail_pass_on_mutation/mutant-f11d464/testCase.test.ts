// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f11d464/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle purely imaginary base with real exponent", () => {
    const base = new Complex(0, 2); // Purely imaginary number 2i
    const exponent = new Complex(2, 0); // Real exponent 2
    const result = base.pow(exponent);
    // (2i)^2 = 4i^2 = -4
    expect(result.re).toBeCloseTo(-4);
    expect(result.im).toBeCloseTo(0);
  });
});