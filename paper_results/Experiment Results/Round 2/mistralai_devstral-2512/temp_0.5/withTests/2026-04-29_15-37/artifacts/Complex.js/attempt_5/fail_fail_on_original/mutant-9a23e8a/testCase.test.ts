// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9a23e8a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a real number greater than 1", () => {
    const z = new Complex(3, 0);
    const result = z.acsch();
    // Expected result for acsch(3) is approximately 0.3274501502372524
    expect(result.re).toBeCloseTo(0.3274501502372524);
    expect(result.im).toBeCloseTo(0);
  });
});