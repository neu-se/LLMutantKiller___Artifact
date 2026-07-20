// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f11d464/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow() with purely imaginary base", () => {
  it("should correctly compute power when base is purely imaginary and exponent is 3", () => {
    const base = new Complex(0, 1); // Purely imaginary number: i
    const exponent = 3; // Real exponent
    const result = base.pow(exponent);
    // Expected: i^3 = -i (since i^3 = -i)
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-1);
  });
});