// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0acca01/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should correctly compute acoth for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    // The mutation changes division to multiplication in the acoth method
    // This test verifies the correct behavior by checking the result is finite
    // The mutated version will produce different (incorrect) values
    expect(result.re).toBeCloseTo(0.1469, 3);
    expect(result.im).toBeCloseTo(-0.2318, 3);
  });
});