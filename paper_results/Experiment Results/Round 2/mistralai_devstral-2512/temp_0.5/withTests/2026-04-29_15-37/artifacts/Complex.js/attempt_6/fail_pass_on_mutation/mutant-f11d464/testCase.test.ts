// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f11d464/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow() with purely imaginary base", () => {
  it("should correctly compute power when base is purely imaginary and exponent is 0", () => {
    const base = new Complex(0, 2); // Purely imaginary number: 2i
    const exponent = 0; // Real exponent
    const result = base.pow(exponent);
    // Expected: (2i)^0 = 1 (any non-zero number to power 0 is 1)
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
  });
});