// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-246ab6e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for both positive and negative values", () => {
    const z1 = new Complex(1, 0);
    const z2 = new Complex(-1, 0);
    const result1 = z1.cosh();
    const result2 = z2.cosh();
    // cosh is an even function, so cosh(1) should equal cosh(-1)
    // The mutation breaks this property because it changes the formula
    expect(result1.re).toBeCloseTo(result2.re, 10);
    expect(result1.im).toBeCloseTo(result2.im, 10);
    // Also verify the actual value
    expect(result1.re).toBeCloseTo(1.5430806348152437, 10);
  });
});