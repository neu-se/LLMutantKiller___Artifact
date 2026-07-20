// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-06b2438/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute the inverse hyperbolic sine by using acos internally", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asinh();
    // These expected values are derived from the correct implementation
    expect(result.re).toBeCloseTo(0.4228370096242838, 10);
    expect(result.im).toBeCloseTo(0.5493061443340548, 10);
  });
});