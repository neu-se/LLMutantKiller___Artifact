// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7fd73bd/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should return correct log for zero real part with positive imaginary part", () => {
    const c = new Complex(0, 1);
    const result = c.log();
    expect(result.re).toBeCloseTo(Math.log(1), 10);
    expect(result.im).toBeCloseTo(Math.PI/2, 10);
  });
});