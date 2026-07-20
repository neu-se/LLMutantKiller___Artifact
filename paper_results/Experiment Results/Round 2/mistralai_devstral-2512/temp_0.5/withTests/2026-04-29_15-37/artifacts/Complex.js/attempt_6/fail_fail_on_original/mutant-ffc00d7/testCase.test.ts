// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ffc00d7/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with multiple operators", () => {
    const result = new Complex("1+2i-3+4i");
    expect(result.re).toBeCloseTo(2);
    expect(result.im).toBeCloseTo(6);
  });
});