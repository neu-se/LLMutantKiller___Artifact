// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f282a3d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with imaginary unit 'i' and handle empty string case", () => {
    const result = new Complex("1+2i");
    expect(result.re).toBe(1);
    expect(result.im).toBe(2);

    // This test case will fail on mutated code where empty string is treated as imaginary unit
    // because "1+2" should be parsed as real number 3, not as complex number 1+2i
    const result2 = new Complex("1+2");
    expect(result2.re).toBe(3);
    expect(result2.im).toBe(0);
  });
});