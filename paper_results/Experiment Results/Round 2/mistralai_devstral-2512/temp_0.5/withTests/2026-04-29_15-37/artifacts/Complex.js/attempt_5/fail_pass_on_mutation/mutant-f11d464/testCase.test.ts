// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f11d464/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow() with purely imaginary base", () => {
  it("should correctly compute power when base is purely imaginary and exponent is 1", () => {
    const base = new Complex(0, 5); // Purely imaginary number: 5i
    const exponent = 1; // Real exponent
    const result = base.pow(exponent);
    // Expected: (5i)^1 = 5i
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(5);
  });
});