// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-da833ea/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech() method", () => {
  it("should correctly compute the inverse hyperbolic secant for a complex number", () => {
    const z = new Complex(0.5, 0.5);
    const result = z.asech();
    // The mutation changes -b/d to -b*d, which will produce a different result
    // For z = 0.5 + 0.5i, the correct result should be approximately:
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(-0.4506938556659452, 10);
  });
});