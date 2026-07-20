// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-03e5dd4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with newline characters", () => {
  it("should correctly parse complex numbers with newline characters", () => {
    const result = new Complex("1+2i\n3+4i");
    expect(result.re).toBe(3);
    expect(result.im).toBe(4);
  });
});