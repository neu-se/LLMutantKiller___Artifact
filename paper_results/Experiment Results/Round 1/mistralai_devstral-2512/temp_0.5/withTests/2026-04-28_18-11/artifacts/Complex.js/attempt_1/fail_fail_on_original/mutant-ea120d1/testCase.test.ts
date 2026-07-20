// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea120d1/testCase.test.ts
import { Complex } from "./complex.js";

describe("logHypot mutation test", () => {
  it("should correctly compute logHypot for values where b equals 3000", () => {
    // This test targets the mutation where the condition changed from _b < 3000 to _b <= 3000
    // We create a complex number where the imaginary part is exactly 3000
    const c = new Complex(1, 3000);
    const result = c.log();
    // The real part of the log should be log(sqrt(1^2 + 3000^2))
    // With the mutation, this would incorrectly use the overflow-safe path
    // when it should use the direct computation path
    const expectedRe = Math.log(Math.sqrt(1 + 3000 * 3000));
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});