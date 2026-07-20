// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-06b2438/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.asech", () => {
  it("should correctly compute the inverse hyperbolic secant of a complex number", () => {
    const c = new Complex(0.5, 0);
    const result = c.asech();
    expect(result.re).toBeCloseTo(Math.acosh(2), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});