// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5a40200/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.cosh", () => {
  it("should correctly compute cosh for small values near zero", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    expect(result.re).toBeCloseTo(1 - (1e-10 * 1e-10) / 2, 10);
    expect(result.im).toBe(0);
  });
});