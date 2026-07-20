// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5bc417c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should not return {re: 0, im: π/2} for input (2, 3)", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    // The mutation causes acoth to always return {re: 0, im: π/2}
    // The original implementation should return a different result
    const expected = { re: 0, im: Math.PI / 2 };
    expect(result.re).not.toBe(expected.re);
    expect(result.im).not.toBe(expected.im);
  });
});