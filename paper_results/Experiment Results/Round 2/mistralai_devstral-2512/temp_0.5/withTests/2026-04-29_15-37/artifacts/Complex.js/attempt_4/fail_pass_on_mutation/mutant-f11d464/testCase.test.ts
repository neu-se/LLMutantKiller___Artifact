// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f11d464/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow() with purely imaginary base", () => {
  it("should correctly compute power when base is purely imaginary and exponent is 2", () => {
    const base = new Complex(0, 3); // Purely imaginary number: 3i
    const exponent = 2; // Real exponent
    const result = base.pow(exponent);
    // Expected: (3i)^2 = -9 (since i^2 = -1)
    expect(result.re).toBeCloseTo(-9);
    expect(result.im).toBeCloseTo(0);
  });
});