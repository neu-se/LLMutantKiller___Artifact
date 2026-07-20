// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5bc417c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should return correct value for complex number (2, 3)", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    // The mutation causes acoth to always return (0, π/2)
    // This test verifies the actual calculation is performed
    expect(result.re).toBeCloseTo(0.14694666622552978, 10);
    expect(result.im).toBeCloseTo(-0.332306990422438, 10);
  });
});