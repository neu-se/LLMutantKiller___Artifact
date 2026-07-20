// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2a78613/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication optimization", () => {
  it("should return NaN when multiplying real number by zero in optimized path", () => {
    const a = new Complex(5, 0);
    const b = new Complex(0, 0);
    const result = a.mul(b);
    // The mutation removes the return statement in the optimization path
    // which would cause the function to fall through to the general case
    // and produce a different result (0,0) instead of the optimized (0,0)
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    expect(result.isZero()).toBe(true);
  });
});