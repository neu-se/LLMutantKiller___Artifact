// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-12b073a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh function", () => {
  it("should correctly compute sinh for a value that exposes the division vs multiplication difference", () => {
    const c = new Complex(1, 0);
    const result = c.sinh();
    // The mutation changes division by 0.5 to multiplication by 0.5
    // This test checks the exact value that would differ between the two operations
    const expectedRe = (Math.exp(1) - Math.exp(-1)) * 0.5;
    expect(result.re).toBeCloseTo(expectedRe, 15);
    expect(result.im).toBe(0);
  });
});