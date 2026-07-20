// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f11d464/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle purely imaginary base with exponent 0", () => {
    const base = new Complex(0, 3); // Purely imaginary number 3i
    const exponent = new Complex(0, 0); // Exponent 0
    const result = base.pow(exponent);
    // (3i)^0 = 1
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
  });
});