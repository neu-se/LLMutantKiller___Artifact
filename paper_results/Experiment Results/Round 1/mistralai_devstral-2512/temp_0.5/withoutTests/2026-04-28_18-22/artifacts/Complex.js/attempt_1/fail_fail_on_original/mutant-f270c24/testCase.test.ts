// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f270c24/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acsch", () => {
  it("should return correct result for real input", () => {
    const c = new Complex(2, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(5)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});