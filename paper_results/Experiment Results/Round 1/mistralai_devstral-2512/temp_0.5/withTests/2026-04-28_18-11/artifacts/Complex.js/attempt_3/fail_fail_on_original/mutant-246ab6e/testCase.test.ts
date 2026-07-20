// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-246ab6e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for negative values using the fallback implementation", () => {
    // Force the use of the fallback cosh implementation by using a value
    // that would trigger the Math.abs(x) < 1e-9 condition
    const z = new Complex(-0.0000000001, 0);
    const result = z.cosh();
    // The correct result should be 1 - (-0.0000000001) = 1.0000000001
    expect(result.re).toBeCloseTo(1.0000000001, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});