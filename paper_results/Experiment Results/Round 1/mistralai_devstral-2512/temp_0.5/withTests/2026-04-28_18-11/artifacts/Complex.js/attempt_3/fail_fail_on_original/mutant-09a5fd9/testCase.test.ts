// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-09a5fd9/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should correctly compute the hyperbolic secant of a complex number", () => {
    const z = new Complex(0, 0.5);
    const result = z.sech();
    const expectedRe = 2 * Math.cosh(0) * Math.cos(0.5) / (Math.cos(0) + Math.cosh(0));
    const expectedIm = -2 * Math.sinh(0) * Math.sin(0.5) / (Math.cos(0) + Math.cosh(0));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});