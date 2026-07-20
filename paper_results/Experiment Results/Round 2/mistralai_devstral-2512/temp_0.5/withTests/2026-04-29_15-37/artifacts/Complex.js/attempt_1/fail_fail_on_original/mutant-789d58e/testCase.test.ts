// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-789d58e/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.expm1", () => {
  it("should correctly compute expm1 for a complex number with a small real part", () => {
    const z = new Complex(0.1, 0.1);
    const result = z.expm1();
    // The mutation changes the Taylor series coefficient from -1/3628800 to -1*3628800
    // This will significantly affect the result for small values where the Taylor series is used
    // We expect the real part to be close to expm1(0.1)*cos(0.1) + cosm1(0.1)
    // With the mutation, this will be way off
    expect(result.re).toBeCloseTo(0.1051709180756477, 10);
    expect(result.im).toBeCloseTo(0.11051709180756477, 10);
  });
});