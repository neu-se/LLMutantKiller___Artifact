// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_10/pending_category/mutant-364057b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should correctly handle the case where real part is zero and magnitude is zero", () => {
    // Create a complex number with zero magnitude
    const c = new Complex(0, 0);
    const result = c.asech();
    // The original code should return Infinity for real part when a === 0
    // The mutated code would return 0 for real part when a === 0
    expect(result.re).toBe(Infinity);
  });
});