// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-8f11a46/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with negative imaginary parts", () => {
    const result = new Complex("3-2i");
    expect(result.re).toBe(3);
    expect(result.im).toBe(-2);
  });
});