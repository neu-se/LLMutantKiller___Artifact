// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5a40200/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.cosh", () => {
  it("should correctly handle the boundary case at exactly 1e-9", () => {
    const z = new Complex(1e-9, 0);
    const result = z.cosh();
    // At exactly 1e-9, original uses 1-x approximation (wrong)
    // Mutant uses the correct formula (Math.exp(x) + Math.exp(-x)) * 0.5
    // We test that the result matches the correct mathematical value
    const expected = (Math.exp(1e-9) + Math.exp(-1e-9)) * 0.5;
    expect(result.re).toBeCloseTo(expected, 15);
    expect(result.im).toBe(0);
  });
});