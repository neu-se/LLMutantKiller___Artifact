// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-789d58e/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.expm1", () => {
  it("should correctly compute expm1 for a small complex number with non-zero imaginary part", () => {
    const z = new Complex(0, 0.1);
    const result = z.expm1();
    // The mutation changes the cosm1 calculation, which affects expm1's real part
    // For small x, the difference between -1/3628800 and -1*3628800 is significant
    expect(result.re).toBeCloseTo(-0.005000004166666664, 10);
    expect(result.im).toBeCloseTo(0.09983341664682815, 10);
  });
});