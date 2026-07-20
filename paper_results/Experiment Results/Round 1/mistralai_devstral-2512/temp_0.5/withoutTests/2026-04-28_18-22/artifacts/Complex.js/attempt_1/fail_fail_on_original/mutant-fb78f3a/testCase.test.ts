// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fb78f3a/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.asec", () => {
  it("should return Infinity for asec(0)", () => {
    const result = new Complex(0, 0).asec();
    expect(result.isInfinite()).toBe(true);
  });
});