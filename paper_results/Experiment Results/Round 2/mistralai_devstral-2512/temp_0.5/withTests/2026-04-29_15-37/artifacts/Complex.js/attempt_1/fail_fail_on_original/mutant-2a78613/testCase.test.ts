// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2a78613/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex multiplication with real numbers", () => {
  it("should correctly multiply two real numbers", () => {
    const a = new Complex(3, 0);
    const b = new Complex(4, 0);
    const result = a.mul(b);
    expect(result.re).toBe(12);
    expect(result.im).toBe(0);
  });
});