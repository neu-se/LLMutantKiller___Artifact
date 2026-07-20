// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ee0d53a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot function", () => {
  it("should use the optimized path for small values and standard path for large values", () => {
    // Test a value that should use the optimized path (a < 3000)
    const small = new Complex(2000, 1000);
    expect(small.abs()).toBeCloseTo(Math.sqrt(2000*2000 + 1000*1000));

    // Test a value that should use the standard path (a >= 3000)
    const large = new Complex(4000, 1000);
    expect(large.abs()).toBeCloseTo(Math.sqrt(4000*4000 + 1000*1000));
  });
});