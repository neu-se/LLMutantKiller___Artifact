// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea120d1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot mutation test", () => {
  it("should correctly handle edge case where b equals 3000", () => {
    const a = 2999;
    const b = 3000;
    const complex = new Complex(a, b);
    const result = complex.log();
    // The original code uses _b < 3000, so when b === 3000 it should use the fallback calculation
    // The mutated code uses _b <= 3000, which would incorrectly use the optimized path
    // This test verifies the correct behavior at the boundary
    expect(result.re).toBeCloseTo(Math.log(Math.sqrt(a * a + b * b)), 10);
    expect(result.im).toBeCloseTo(Math.atan2(b, a), 10);
  });
});