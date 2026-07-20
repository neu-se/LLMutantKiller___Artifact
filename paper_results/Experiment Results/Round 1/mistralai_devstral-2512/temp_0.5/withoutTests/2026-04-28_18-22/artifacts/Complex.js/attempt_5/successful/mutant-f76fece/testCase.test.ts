// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f76fece/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex equals method", () => {
  it("should return true when comparing numbers with difference exactly equal to EPSILON", () => {
    const c1 = new Complex(0, 0);
    const c2 = new Complex(Complex.EPSILON, Complex.EPSILON);
    expect(c1.equals(c2)).toBe(true);
  });
});