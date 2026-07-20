// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-92ea616/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot()", () => {
  it("should handle non-zero complex numbers correctly", () => {
    const c = new Complex(1, 0);
    const result = c.acot();
    // For a real number (1,0), the acot should return a real result
    // The mutation would incorrectly take the (d === 0) branch for non-zero inputs
    expect(result.im).toBeCloseTo(0, 10);
    expect(result.re).toBeCloseTo(0.7853981634, 6);
  });
});