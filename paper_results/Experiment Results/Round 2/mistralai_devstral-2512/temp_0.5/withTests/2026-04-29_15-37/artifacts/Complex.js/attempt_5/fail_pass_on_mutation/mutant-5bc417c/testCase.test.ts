// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5bc417c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should not return (0, π/2) for all inputs", () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    // The mutation causes acoth to always return (0, π/2)
    // This test verifies it returns a different value for (1,1)
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(Math.PI / 2);
  });
});