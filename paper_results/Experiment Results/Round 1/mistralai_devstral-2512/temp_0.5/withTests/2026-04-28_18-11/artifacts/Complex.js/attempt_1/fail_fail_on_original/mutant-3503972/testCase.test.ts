// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3503972/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acsch()", () => {
  it("should return correct imaginary part for acsch(0 + 1i)", () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});