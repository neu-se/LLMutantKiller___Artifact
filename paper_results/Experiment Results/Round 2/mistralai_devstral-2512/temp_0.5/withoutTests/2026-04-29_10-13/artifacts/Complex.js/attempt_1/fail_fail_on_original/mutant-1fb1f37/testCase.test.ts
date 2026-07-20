// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-1fb1f37/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.cosh", () => {
  it("should correctly compute cosh for small values", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    expect(result.re).toBeCloseTo(1 - 0.5 * (1e-10) * (1e-10), 10);
    expect(result.im).toBe(0);
  });
});