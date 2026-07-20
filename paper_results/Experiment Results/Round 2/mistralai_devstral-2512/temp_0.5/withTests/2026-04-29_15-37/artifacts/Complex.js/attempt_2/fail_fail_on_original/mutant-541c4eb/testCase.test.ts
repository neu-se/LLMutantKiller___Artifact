// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-541c4eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute the inverse hyperbolic sine of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.asinh();
    const expectedRe = 0.615557198389214;
    const expectedIm = 1.000247448345555;
    expect(Math.abs(result.re - expectedRe)).toBeLessThan(1e-10);
    expect(Math.abs(result.im - expectedIm)).toBeLessThan(1e-10);
  });
});