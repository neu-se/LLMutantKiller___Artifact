// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d85712e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with decimal coefficient before imaginary unit", () => {
  it("should correctly parse complex numbers with decimal coefficient before imaginary unit", () => {
    const c = new Complex("3+2.5i");
    expect(c.re).toBe(3);
    expect(c.im).toBe(2.5);
  });
});