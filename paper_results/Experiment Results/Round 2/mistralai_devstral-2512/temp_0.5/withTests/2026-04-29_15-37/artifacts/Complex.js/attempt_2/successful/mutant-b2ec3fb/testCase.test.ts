// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b2ec3fb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.floor", () => {
  it("should correctly floor both real and imaginary parts", () => {
    const c = new Complex(3.7, -2.3);
    const floored = c.floor(0);
    expect(floored.re).toBe(3);
    expect(floored.im).toBe(-3);
  });
});