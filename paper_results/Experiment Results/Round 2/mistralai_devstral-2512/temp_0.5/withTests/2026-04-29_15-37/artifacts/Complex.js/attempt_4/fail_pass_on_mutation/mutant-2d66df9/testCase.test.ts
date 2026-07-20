// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2d66df9/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with multiple minus signs before imaginary unit", () => {
    const c = new Complex("1--i");
    expect(c.re).toBe(1);
    expect(c.im).toBe(1);
  });
});