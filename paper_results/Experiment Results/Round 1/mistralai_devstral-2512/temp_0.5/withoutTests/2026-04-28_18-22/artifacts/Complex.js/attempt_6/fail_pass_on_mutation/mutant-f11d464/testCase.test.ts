// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f11d464/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly compute power for purely imaginary base with negative real exponent", () => {
    const base = new Complex(0, 2); // Purely imaginary number 2i
    const exponent = new Complex(-1, 0); // Real exponent -1
    const result = base.pow(exponent);
    // (2i)^(-1) = 1/(2i) = -i/2
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-0.5);
  });
});