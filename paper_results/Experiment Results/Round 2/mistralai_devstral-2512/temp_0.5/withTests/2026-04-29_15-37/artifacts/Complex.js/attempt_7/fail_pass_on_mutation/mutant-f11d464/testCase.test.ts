// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f11d464/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow() with purely imaginary base", () => {
  it("should correctly compute power when base is purely imaginary and exponent is negative", () => {
    const base = new Complex(0, 2); // Purely imaginary number: 2i
    const exponent = -1; // Negative real exponent
    const result = base.pow(exponent);
    // Expected: (2i)^-1 = -0.5i (since 1/(2i) = -0.5i)
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-0.5);
  });
});