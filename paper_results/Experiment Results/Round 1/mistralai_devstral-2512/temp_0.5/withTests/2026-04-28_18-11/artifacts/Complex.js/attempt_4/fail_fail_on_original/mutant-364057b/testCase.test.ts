// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-364057b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should handle division by zero case correctly when real part is zero", () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    expect(result.re).toBe(0);
    expect(result.im).toBeCloseTo(1.5707963267948966);
  });
});