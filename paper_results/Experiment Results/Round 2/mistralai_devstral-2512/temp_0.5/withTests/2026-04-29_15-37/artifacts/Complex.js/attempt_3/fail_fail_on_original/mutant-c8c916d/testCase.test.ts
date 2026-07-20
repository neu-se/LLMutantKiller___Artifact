// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c8c916d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly handle non-zero real part when imaginary part is zero", () => {
    const result = new Complex(2, 0).acsc();
    const expectedRe = 1 / Math.sinh(Math.acosh(2));
    expect(Math.abs(result.re - expectedRe)).toBeLessThan(1e-10);
    expect(result.im).toBe(0);
  });
});