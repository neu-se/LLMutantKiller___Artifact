// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-374868f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should correctly compute the inverse hyperbolic secant for a specific complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The mutation changes a/d to a*d in the asech calculation
    // This test verifies the original behavior by checking the exact output values
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(-0.9045568943023813);
  });
});