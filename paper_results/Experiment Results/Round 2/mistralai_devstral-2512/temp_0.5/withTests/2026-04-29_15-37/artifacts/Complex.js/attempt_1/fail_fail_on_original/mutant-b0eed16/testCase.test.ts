// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b0eed16/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.sec() method", () => {
  it("should correctly compute sec(0.5 + 0.5i)", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sec();
    // Expected result computed using the original formula: Math.cos(a) * cosh(b) / d
    // For a=0.5, b=0.5:
    // d = 0.5 * cosh(1) + 0.5 * Math.cos(1)
    // re = Math.cos(0.5) * cosh(0.5) / d
    // im = Math.sin(0.5) * sinh(0.5) / d
    const expectedRe = Math.cos(0.5) * Math.cosh(0.5) / (0.5 * Math.cosh(1) + 0.5 * Math.cos(1));
    const expectedIm = Math.sin(0.5) * Math.sinh(0.5) / (0.5 * Math.cosh(1) + 0.5 * Math.cos(1));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});