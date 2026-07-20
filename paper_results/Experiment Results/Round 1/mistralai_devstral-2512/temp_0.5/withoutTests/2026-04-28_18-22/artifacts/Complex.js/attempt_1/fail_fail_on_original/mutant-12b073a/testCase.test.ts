// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-12b073a/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex sinh function", () => {
  it("should correctly compute sinh for a non-zero value", () => {
    const c = new Complex(1, 0);
    const result = c.sinh();
    const expectedRe = (Math.exp(1) - Math.exp(-1)) * 0.5;
    const expectedIm = 0;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});