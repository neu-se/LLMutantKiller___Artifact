// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-1ee66d1/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute the arc cosecant of a purely imaginary number", () => {
    const c = new Complex(0, 2);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-0.5 * Math.log((5 + Math.sqrt(29)) / 4), 10);
  });
});