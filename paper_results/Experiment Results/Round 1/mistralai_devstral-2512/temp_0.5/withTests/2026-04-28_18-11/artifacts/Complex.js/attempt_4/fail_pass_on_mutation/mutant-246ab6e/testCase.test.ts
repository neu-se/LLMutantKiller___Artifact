// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-246ab6e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for values outside the small range", () => {
    // Use a value that will trigger the else branch of cosh implementation
    // The mutation changes Math.exp(-x) to Math.exp(+x) which should affect negative inputs
    const z = new Complex(-2, 0);
    const result = z.cosh();
    // Correct cosh(-2) = (e^2 + e^-2)/2
    const expected = (Math.exp(2) + Math.exp(-2)) * 0.5;
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});