// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-dd97a09/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant of a complex number", () => {
    const c = new Complex(1, 2);
    const result = c.sech();
    expect(result.re).toBeCloseTo(0.21052631578947368, 15);
    expect(result.im).toBeCloseTo(-0.46211715726000974, 15);
  });
});