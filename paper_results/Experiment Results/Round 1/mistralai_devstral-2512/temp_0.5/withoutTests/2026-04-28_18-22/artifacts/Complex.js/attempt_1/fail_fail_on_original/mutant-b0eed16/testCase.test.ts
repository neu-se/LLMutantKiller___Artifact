// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b0eed16/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.sec()", () => {
  it("should correctly compute sec for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.sec();
    const expectedRe = 0.5 * (Math.cos(2 * 1) + Math.cosh(2 * 1)) / (Math.cos(1) * Math.cosh(1));
    const expectedIm = -0.5 * (Math.sin(2 * 1) + Math.sinh(2 * 1)) / (Math.cos(1) * Math.cosh(1));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});