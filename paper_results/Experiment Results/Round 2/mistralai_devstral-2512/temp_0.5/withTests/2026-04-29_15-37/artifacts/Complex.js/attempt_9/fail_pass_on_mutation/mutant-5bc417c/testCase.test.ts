// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5bc417c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should return correct value for complex number (1, 1)", () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    // The mutation causes acoth to always return (0, π/2)
    // This test verifies the actual calculation is performed
    expect(result.re).toBeCloseTo(0.402359478108525, 10);
    expect(result.im).toBeCloseTo(-0.553574358897045, 10);
    // Additional check to ensure it's not returning the mutated value
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(Math.PI / 2);
  });
});