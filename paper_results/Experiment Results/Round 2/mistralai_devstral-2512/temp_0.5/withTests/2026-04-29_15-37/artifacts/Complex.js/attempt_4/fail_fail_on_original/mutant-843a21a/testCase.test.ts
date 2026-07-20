// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-843a21a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should return Infinity for pure imaginary input with zero real part", () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    expect(result.isInfinite()).toBe(true);
  });
});