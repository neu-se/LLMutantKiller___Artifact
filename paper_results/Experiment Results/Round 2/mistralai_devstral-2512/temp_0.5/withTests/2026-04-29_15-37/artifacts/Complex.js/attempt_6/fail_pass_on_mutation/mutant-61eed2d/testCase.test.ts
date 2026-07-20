// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-61eed2d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing from string", () => {
  it("should correctly parse a complex number and verify the imaginary property exists", () => {
    const result = new Complex("5+2i");
    expect(result.re).toBe(5);
    expect(result.im).toBe(2);
    expect("im" in result).toBe(true);
    expect(result.hasOwnProperty("im")).toBe(true);
  });
});