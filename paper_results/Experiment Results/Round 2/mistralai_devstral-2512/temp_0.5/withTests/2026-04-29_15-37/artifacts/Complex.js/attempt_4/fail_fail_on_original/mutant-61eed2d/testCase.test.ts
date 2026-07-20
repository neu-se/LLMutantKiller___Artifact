// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-61eed2d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing from string", () => {
  it("should correctly handle empty string parsing", () => {
    const result = new Complex("");
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});