// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c3d4345/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.asec", () => {
  it("should return Infinity when called on zero", () => {
    const zero = new Complex(0, 0);
    const result = zero.asec();
    expect(result.isInfinite()).toBe(true);
  });
});