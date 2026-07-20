// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-61eed2d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing from string", () => {
  it("should correctly parse a complex number with both real and imaginary parts", () => {
    const result = new Complex("3+4i");
    expect(result.re).toBe(3);
    expect(result.im).toBe(4);
    expect(result).toHaveProperty("im");
    expect(typeof result.im).toBe("number");
  });
});