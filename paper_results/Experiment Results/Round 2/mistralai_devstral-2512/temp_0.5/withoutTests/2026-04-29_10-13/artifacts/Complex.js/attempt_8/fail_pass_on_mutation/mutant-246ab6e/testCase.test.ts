// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-246ab6e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for values where the mutation would cause significant difference", () => {
    const z = new Complex(10, 0);
    const result = z.cosh();
    // For x=10, the correct cosh(10) = (e^10 + e^-10)/2 ≈ 11013.232920103324
    // The mutated version would give (e^10 + e^10)/2 = e^10 ≈ 22026.465794806718
    // This is a significant difference that should be detectable
    const expected = (Math.exp(10) + Math.exp(-10)) * 0.5;
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});