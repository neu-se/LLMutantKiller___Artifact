// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-cba673a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh function", () => {
  it("should correctly compute cosh for small values near zero", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    expect(result.re).toBeCloseTo(1 - 5e-21, 15);
    expect(result.im).toBeCloseTo(0);
  });
});