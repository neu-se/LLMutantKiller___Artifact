// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-03e5dd4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with whitespace", () => {
  it("should correctly parse complex numbers with tab character", () => {
    const result = new Complex("1+2i\t");
    expect(result.re).toBe(1);
    expect(result.im).toBe(2);
  });
});