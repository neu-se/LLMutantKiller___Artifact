// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f11d464/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle purely imaginary base with fractional exponent", () => {
    const base = new Complex(0, 4); // Purely imaginary number 4i
    const exponent = new Complex(0.5, 0); // Real exponent 0.5 (square root)
    const result = base.pow(exponent);
    // (4i)^0.5 = sqrt(4i) = 2*(1+i)/sqrt(2) = sqrt(2)*(1+i)
    const expectedReal = Math.sqrt(2);
    const expectedImag = Math.sqrt(2);
    expect(result.re).toBeCloseTo(expectedReal);
    expect(result.im).toBeCloseTo(expectedImag);
  });
});