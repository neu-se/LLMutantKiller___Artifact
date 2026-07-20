// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-12b073a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh function", () => {
  it("should correctly compute sinh for a value where result differs between division and multiplication", () => {
    const c = new Complex(2, 0);
    const result = c.sinh();
    const expectedRe = (Math.exp(2) - Math.exp(-2)) * 0.5;
    const expectedIm = 0;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});