// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c8c916d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly handle non-zero real and imaginary parts", () => {
    const result = new Complex(1, 1).acsc();
    const expected = new Complex(1, -1).asinh();
    expect(Math.abs(result.re - expected.re)).toBeLessThan(1e-10);
    expect(Math.abs(result.im - expected.im)).toBeLessThan(1e-10);
  });
});