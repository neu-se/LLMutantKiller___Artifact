// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-23a4844/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should return Infinity for real part when input is 1", () => {
    const result = new Complex(1, 0).atanh();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});