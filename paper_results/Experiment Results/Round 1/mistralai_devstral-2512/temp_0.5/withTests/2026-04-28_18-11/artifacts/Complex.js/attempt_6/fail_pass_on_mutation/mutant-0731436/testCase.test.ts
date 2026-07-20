// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0731436/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should handle purely imaginary inputs correctly", () => {
    const c = new Complex(0, 2);
    const result = c.asec();
    // The mutation changes the behavior for purely imaginary inputs
    // Original: returns new Complex(0, -b / 0).acos() (which should be Infinity)
    // Mutated: returns new Complex(0, 0).acos() (which should be PI/2)
    // We need to check the actual behavior of the original code first
    expect(result.re).toBeCloseTo(1.5707963267948966);
    expect(result.im).toBeCloseTo(0.48121182505960347);
  });
});