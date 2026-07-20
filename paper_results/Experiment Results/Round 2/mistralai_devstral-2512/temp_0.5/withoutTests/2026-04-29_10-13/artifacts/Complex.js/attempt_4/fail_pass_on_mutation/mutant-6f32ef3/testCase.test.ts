// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-6f32ef3/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number string representation", () => {
  it("should correctly format complex number with zero real part and negative imaginary part", () => {
    const c = new Complex(0, -1);
    const result = c.toString();
    expect(result).toBe("-i");
  });
});