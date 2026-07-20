// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a97afda/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atan", () => {
  it("should correctly compute atan for complex number with b !== 1", () => {
    const c = new Complex(0, 0.5);
    const result = c.atan();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeGreaterThan(0);
    expect(result.im).toBeLessThan(Infinity);
  });
});