// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2a78613/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication optimization", () => {
  it("should return a Complex instance when multiplying two real numbers", () => {
    const a = new Complex(5, 0);
    const b = new Complex(7, 0);
    const result = a.mul(b);
    expect(result).toBeInstanceOf(Complex);
    expect(result.re).toBe(35);
    expect(result.im).toBe(0);
  });
});