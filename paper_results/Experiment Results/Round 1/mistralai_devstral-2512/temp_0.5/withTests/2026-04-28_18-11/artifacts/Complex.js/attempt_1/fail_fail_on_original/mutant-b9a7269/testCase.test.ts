// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b9a7269/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex floor method", () => {
  it("should correctly floor complex numbers with specified decimal places", () => {
    const c = new Complex(1.2345, 6.7890);
    const result = c.floor(2);
    expect(result.re).toBe(1.23);
    expect(result.im).toBe(6.78);
  });
});