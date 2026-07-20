// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-1ee66d1/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acsc()", () => {
  it("should correctly handle the case when a=0 and b=0", () => {
    const result = new Complex(0, 0).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2);
    expect(result.im).toBe(Infinity);
  });
});