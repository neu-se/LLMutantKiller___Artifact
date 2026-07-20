// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0fdda52/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js hypot function mutation test", () => {
  it("should correctly compute hypot for edge case where a is exactly 3000 and b is slightly less", () => {
    // This test targets the mutation in the hypot function where the condition was changed from a < b to a >= b
    // We test with values where a is exactly 3000 and b is just below to trigger the boundary condition
    const c = new Complex(3000, 2999);
    const absValue = c.abs();
    // The correct hypot calculation for (3000, 2999) should be sqrt(3000² + 2999²) ≈ 4241.933639273486
    expect(absValue).toBeCloseTo(4241.933639273486);
  });
});