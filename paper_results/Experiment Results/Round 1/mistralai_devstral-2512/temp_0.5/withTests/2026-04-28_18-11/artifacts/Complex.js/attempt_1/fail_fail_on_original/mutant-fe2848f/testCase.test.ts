// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fe2848f/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.atanh()", () => {
  it("should correctly handle real numbers greater than 1", () => {
    const result = new Complex(2, 0).atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(Math.PI / 2);
  });
});