// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-da833ea/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech() method", () => {
  it("should correctly compute the inverse hyperbolic secant for a specific complex number", () => {
    const z = new Complex(0.5, 0.5);
    const result = z.asech();
    // The mutation changes -b/d to -b*d, which will produce a different result
    // We test the relationship between the result and its expected properties
    // rather than exact values to avoid precision issues
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBeLessThan(0);
    // Verify the result satisfies: sech(asech(z)) ≈ z
    const sechResult = result.sech();
    expect(sechResult.re).toBeCloseTo(z.re, 5);
    expect(sechResult.im).toBeCloseTo(z.im, 5);
  });
});