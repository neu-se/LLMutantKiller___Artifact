// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-61eed2d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing from string", () => {
  it("should correctly parse a complex number and verify the imaginary property is a number", () => {
    const result = new Complex("1+1i");
    expect(result.re).toBe(1);
    expect(result.im).toBe(1);
    expect(typeof result.im).toBe("number");
    expect(isNaN(result.im)).toBe(false);
  });
});