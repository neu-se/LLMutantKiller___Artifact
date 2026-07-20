// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-069e426/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.asec()", () => {
  it("should handle zero real part correctly in the special case", () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});