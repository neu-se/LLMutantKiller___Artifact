// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2b36f89/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should correctly compute the cosecant of a complex number with non-zero imaginary part", () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    // The mutation changes division to multiplication in the denominator calculation
    // This will significantly affect the result for non-zero imaginary parts
    // We'll check against a known expected value with appropriate precision
    expect(result.re).toBeCloseTo(0.6215180171704285, 5);
    expect(result.im).toBeCloseTo(-0.30393100162842646, 5);
  });
});