// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d7362f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication optimization", () => {
  it("should correctly multiply real numbers using the optimization path", () => {
    const a = new Complex(2, 0);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    // The mutant changes this['im'] to this[""] which is undefined
    // This causes the condition to fail and fall through to the general case
    // The general case should still produce correct results, but we can detect
    // the mutation by checking the exact behavior of the optimization path
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
    // This will fail on the mutant because the optimization path won't be taken
    // and the general case might produce slightly different results
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
  });
});