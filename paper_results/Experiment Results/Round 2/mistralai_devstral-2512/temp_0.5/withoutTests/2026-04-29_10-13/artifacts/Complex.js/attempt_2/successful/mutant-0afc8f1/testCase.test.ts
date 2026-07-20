// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0afc8f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should return a Complex object when asech is called", () => {
    const c = new Complex(0.5, 0);
    const result = c.asech();
    expect(result).toBeInstanceOf(Complex);
  });
});