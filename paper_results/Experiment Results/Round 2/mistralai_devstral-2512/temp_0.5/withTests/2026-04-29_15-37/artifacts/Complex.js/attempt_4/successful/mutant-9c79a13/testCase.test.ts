// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9c79a13/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should correctly compute the hyperbolic secant for a complex number with non-zero real and imaginary parts", () => {
    const z = new Complex(1, 1);
    const result = z.sech();
    const expectedRe = 0.49833703055518686;
    const expectedIm = -0.5910838417210451;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});