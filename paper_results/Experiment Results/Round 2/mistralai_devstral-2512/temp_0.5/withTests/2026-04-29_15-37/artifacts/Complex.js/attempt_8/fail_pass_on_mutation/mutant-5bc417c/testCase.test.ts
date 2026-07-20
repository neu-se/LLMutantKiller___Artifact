// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5bc417c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should not return (0, π/2) for any input", () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    // The mutation causes acoth to always return (0, π/2)
    // This test verifies the actual calculation is performed
    const expectedRe = 0.402359478108525;
    const expectedIm = -0.553574358897045;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});