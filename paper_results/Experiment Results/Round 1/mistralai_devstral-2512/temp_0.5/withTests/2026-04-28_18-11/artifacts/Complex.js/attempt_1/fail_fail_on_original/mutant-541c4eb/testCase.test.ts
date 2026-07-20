// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-541c4eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute the inverse hyperbolic sine of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.asinh();
    const expectedRe = 0.6692521202910305;
    const expectedIm = 1.0612750619050357;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});