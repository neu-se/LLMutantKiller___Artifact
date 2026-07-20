// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-541c4eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute the inverse hyperbolic sine of a complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asinh();
    // The mutation swaps re and im in the asinh calculation
    // Original should produce different results than mutated version
    expect(result.re).not.toBe(result.im);
  });
});