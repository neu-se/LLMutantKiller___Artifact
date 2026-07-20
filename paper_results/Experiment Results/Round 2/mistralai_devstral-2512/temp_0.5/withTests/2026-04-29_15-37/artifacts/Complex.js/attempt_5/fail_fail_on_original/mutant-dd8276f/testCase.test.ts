// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-dd8276f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should return Infinity for zero complex number", () => {
    const c = new Complex(0, 0);
    const result = c.acsc();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});