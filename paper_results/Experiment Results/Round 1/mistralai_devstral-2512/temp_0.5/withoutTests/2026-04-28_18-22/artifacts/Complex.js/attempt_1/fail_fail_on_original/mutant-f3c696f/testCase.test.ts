// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f3c696f/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex acot", () => {
  it("should return correct result for acot(0, 1)", () => {
    const result = new Complex(0, 1).acot();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-Infinity);
  });
});