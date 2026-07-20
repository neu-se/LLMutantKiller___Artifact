// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7721017/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle (0+0i)^(1+0i) case", () => {
    const base = new Complex(0, 0);
    const exponent = new Complex(1, 0);
    const result = base.pow(exponent);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});