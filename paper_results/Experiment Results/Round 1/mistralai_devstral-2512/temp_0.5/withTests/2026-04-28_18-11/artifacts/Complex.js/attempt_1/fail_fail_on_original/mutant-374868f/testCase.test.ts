// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-374868f/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.asech()", () => {
  it("should correctly compute the inverse hyperbolic secant for a non-zero complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The mutation changes a/d to a*d in the asech calculation, which should produce a different result
    // We'll verify the real part is as expected (original behavior)
    expect(result.re).toBeCloseTo(0.5108256237659907);
    expect(result.im).toBeCloseTo(-0.4532515535214916);
  });
});