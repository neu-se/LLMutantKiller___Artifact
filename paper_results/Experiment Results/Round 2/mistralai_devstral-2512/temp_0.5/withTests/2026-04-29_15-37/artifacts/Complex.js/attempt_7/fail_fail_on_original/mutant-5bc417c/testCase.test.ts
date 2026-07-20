// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5bc417c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should return correct value for complex number (0.5, 0.5)", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acoth();
    // The mutation causes acoth to always return (0, π/2)
    // This test verifies the actual calculation is performed
    expect(result.re).toBeCloseTo(0.80471895621705, 10);
    expect(result.im).toBeCloseTo(-0.665774071851088, 10);
  });
});