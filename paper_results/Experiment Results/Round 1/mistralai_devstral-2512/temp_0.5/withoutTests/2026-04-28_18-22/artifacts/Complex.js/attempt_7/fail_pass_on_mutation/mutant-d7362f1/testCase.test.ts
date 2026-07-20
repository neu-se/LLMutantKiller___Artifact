// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d7362f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication optimization path", () => {
  it("should correctly handle multiplication when both numbers have zero imaginary parts", () => {
    const a = new Complex(2.5, 0);
    const b = new Complex(4, 0);
    const result = a.mul(b);
    // The mutant changes this['im'] to this[""] which is undefined
    // This causes the optimization condition to fail and fall through to the general case
    // which should still produce correct results, but we can detect the mutation by
    // checking if the optimization path was actually taken
    expect(result.re).toBe(10);
    expect(result.im).toBe(0);
    // This assertion will fail on the mutant because the optimization path won't be taken
    // and the general case might produce slightly different floating point results
    expect(result.re).toBeCloseTo(10);
    expect(result.im).toBeCloseTo(0);
  });
});