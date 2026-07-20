// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3486a08/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.equals", () => {
  it("should return false when comparing two different complex numbers", () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 4);
    expect(c1.equals(c2)).toBe(false);
  });
});