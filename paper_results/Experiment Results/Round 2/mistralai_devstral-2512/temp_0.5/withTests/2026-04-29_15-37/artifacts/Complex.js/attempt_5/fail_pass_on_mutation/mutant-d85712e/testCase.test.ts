// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d85712e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with implicit 1 before imaginary unit", () => {
    const result = new Complex("1+i");
    expect(result.re).toBe(1);
    expect(result.im).toBe(1);
  });
});