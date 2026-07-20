// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-dd97a09/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should return a Complex object when called on a complex number", () => {
    const c = new Complex(1, 2);
    const result = c.sech();
    expect(result).toBeInstanceOf(Complex);
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
  });
});