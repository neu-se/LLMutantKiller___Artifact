// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5b5dc13/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acsch()", () => {
  it("should correctly handle the case when a is 0 and b is non-zero", () => {
    const result = new Complex(0, 1).acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});