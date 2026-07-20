// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-364057b/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.asech()", () => {
  it("should handle zero real part correctly when magnitude is zero", () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    expect(result.isInfinite()).toBe(true);
  });
});