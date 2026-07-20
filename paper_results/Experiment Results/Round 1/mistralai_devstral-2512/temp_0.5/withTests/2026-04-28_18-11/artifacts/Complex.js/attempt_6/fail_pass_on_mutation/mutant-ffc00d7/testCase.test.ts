// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ffc00d7/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with mixed operators", () => {
    const result = new Complex("+-i");
    expect(result.re).toBe(0);
    expect(result.im).toBe(-1);
  });
});