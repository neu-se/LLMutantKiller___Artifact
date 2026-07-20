// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-61eed2d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing from string", () => {
  it("should correctly parse a complex number and verify the imaginary property is accessible", () => {
    const result = new Complex("4+5i");
    expect(result.re).toBe(4);
    expect(result.im).toBe(5);
    expect(Object.keys(result)).toContain("im");
    expect(Object.prototype.hasOwnProperty.call(result, "im")).toBe(true);
  });
});