// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f11d464/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should handle fully imaginary base with exponent 3 using the special case branch", () => {
    const base = new Complex(0, 2);
    const exponent = new Complex(3, 0);
    const result = base.pow(exponent);
    // This test specifically targets the mutated condition
    // The mutation changes "else if (a === 0)" to "else if (false)"
    // which should break the special case handling for fully imaginary bases
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-8);
  });
});