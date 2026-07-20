// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f11d464/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow() with purely imaginary base", () => {
  it("should correctly compute power when base is purely imaginary and exponent is fractional", () => {
    const base = new Complex(0, 4); // Purely imaginary number: 4i
    const exponent = 0.5; // Fractional exponent
    const result = base.pow(exponent);
    // Expected: (4i)^0.5 = 2*(1+i)/sqrt(2) = sqrt(2) + sqrt(2)i
    const expectedReal = Math.sqrt(2);
    const expectedImag = Math.sqrt(2);
    expect(result.re).toBeCloseTo(expectedReal);
    expect(result.im).toBeCloseTo(expectedImag);
  });
});