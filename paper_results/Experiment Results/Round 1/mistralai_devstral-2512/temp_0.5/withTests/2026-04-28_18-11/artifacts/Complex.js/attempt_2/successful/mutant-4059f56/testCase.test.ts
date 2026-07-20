// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-4059f56/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.clone", () => {
  it("should create a copy of the complex number with the same real and imaginary parts", () => {
    const original = new Complex(3, 4);
    const cloned = original.clone();
    expect(cloned.re).toBe(3);
    expect(cloned.im).toBe(4);
  });
});