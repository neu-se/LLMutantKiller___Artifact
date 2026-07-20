// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f1a032c/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.floor", () => {
  it("should correctly floor the imaginary part of a complex number", () => {
    const c = new Complex(1.5, 2.7);
    const result = c.floor();
    expect(result.im).toBe(2);
  });
});