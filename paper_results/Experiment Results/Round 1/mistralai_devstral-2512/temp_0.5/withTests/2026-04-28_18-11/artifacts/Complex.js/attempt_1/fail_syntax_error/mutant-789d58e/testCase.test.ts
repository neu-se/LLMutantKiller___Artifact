// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-789d58e/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.expm1", () => {
  it("should correctly compute expm1 for a small complex number", () => {
    const z = new Complex(0, 0.1);
    const result = z.expm1();
    const expectedRe = Math.expm1(0) * Math.cos(0.1) + cosm1(0.1);
    const expectedIm = Math.exp(0) * Math.sin(0.1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});

// Helper function to replicate the cosm1 calculation from the original code
function cosm1(x: number): number {
  var b = Math.PI / 4;
  if (-b > x || x > b) {
    return Math.cos(x) - 1.0;
  }
  var xx = x * x;
  return xx * (
    xx * (
      xx * (
        xx * (
          xx * (
            xx * (
              xx * (
                xx / 20922789888000
                   - 1 / 87178291200)
              - 1 / 3628800)
            + 1 / 40320)
          - 1 / 720)
        + 1 / 24)
      - 1 / 2);
}