// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f76fece/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex equals method", () => {
  it("should return true when comparing identical complex numbers", () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(1, 1);
    expect(c1.equals(c2)).toBe(true);
  });
});