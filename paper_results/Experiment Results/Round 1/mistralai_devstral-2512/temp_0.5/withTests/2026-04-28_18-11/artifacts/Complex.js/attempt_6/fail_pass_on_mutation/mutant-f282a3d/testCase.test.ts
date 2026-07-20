// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f282a3d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly handle empty string in complex number parsing", () => {
    const result = new Complex("1+2");
    expect(result.re).toBe(3);
    expect(result.im).toBe(0);
  });
});