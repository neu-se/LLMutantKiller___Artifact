// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ae47177/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.atan", () => {
  it("should return correct values for atan(0, 1) and atan(0, -1)", () => {
    const result1 = new Complex(0, 1).atan();
    expect(result1.re).toBe(0);
    expect(result1.im).toBe(Infinity);

    const result2 = new Complex(0, -1).atan();
    expect(result2.re).toBe(0);
    expect(result2.im).toBe(-Infinity);
  });
});