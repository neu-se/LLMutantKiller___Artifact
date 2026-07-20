// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-059c37e/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.atan", () => {
  it("should return correct value for atan(0, -1)", () => {
    const result = new Complex(0, -1).atan();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBe(-Infinity);
  });
});