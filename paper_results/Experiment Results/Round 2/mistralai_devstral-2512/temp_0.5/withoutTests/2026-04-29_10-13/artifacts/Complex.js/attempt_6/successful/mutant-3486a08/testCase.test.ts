// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3486a08/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.equals", () => {
  it("should return false when comparing complex numbers with different real parts", () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(2, 2);
    expect(c1.equals(c2)).toBe(false);
  });
});