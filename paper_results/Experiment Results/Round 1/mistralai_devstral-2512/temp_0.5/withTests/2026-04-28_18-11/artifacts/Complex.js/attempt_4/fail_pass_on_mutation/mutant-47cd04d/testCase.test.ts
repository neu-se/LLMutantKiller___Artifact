// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-47cd04d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should return correct result when adding two finite complex numbers", () => {
    const a = new Complex(3, 4);
    const b = new Complex(1, 2);
    const result = a.add(b);
    expect(result.re).toBe(4);
    expect(result.im).toBe(6);
  });
});