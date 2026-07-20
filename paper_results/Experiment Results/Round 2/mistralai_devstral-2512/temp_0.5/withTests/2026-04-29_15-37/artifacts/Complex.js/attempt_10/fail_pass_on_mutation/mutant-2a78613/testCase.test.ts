// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2a78613/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication optimization", () => {
  it("should correctly multiply two real numbers using optimization path", () => {
    const a = new Complex(3, 0);
    const b = new Complex(4, 0);
    const result = a.mul(b);
    // The mutation removes the return statement in the optimization path
    // which would cause the function to continue and return a different result
    expect(result.re).toBe(12);
    expect(result.im).toBe(0);
    // Verify the result is exactly what we expect from the optimization
    expect(result.re).toBe(3 * 4);
    expect(result.im).toBe(0);
  });
});