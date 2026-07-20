// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5bc417c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should return correct value for complex number (2, 3)", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    // The mutation causes acoth to always return {re: 0, im: π/2}
    // For input (2, 3), the original implementation should return a different result
    expect(result.re).toBeCloseTo(0.14694666622552965, 10);
    expect(result.im).toBeCloseTo(-0.3217505543966422, 10);
  });
});