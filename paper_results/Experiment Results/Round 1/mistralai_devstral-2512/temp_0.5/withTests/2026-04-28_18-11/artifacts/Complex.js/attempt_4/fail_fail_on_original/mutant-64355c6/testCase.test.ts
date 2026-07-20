// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-64355c6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should return a finite value for non-zero real numbers", () => {
    const c = new Complex(2, 0);
    const result = c.asec();
    expect(result.isFinite()).toBe(true);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI / 2);
  });
});