// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-61eed2d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing from string", () => {
  it("should correctly parse a complex number and verify the imaginary property is not undefined", () => {
    const result = new Complex("2+3i");
    expect(result.re).toBe(2);
    expect(result.im).toBe(3);
    expect(result.im).not.toBeUndefined();
    expect(result.im).not.toBeNull();
  });
});