// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-551be51/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.ceil", () => {
  it("should correctly ceil both real and imaginary parts", () => {
    const c = new Complex(1.2, 3.7);
    const result = c.ceil();
    expect(result.re).toBe(2);
    expect(result.im).toBe(4);
  });
});