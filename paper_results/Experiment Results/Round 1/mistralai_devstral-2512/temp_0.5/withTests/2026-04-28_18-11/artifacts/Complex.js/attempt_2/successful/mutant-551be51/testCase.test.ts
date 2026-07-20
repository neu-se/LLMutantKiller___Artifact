// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-551be51/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.ceil", () => {
  it("should correctly ceil both real and imaginary parts", () => {
    const c = new Complex(1.234, 5.678);
    const result = c.ceil(2);
    expect(result.re).toBe(1.24);
    expect(result.im).toBe(5.68);
  });
});