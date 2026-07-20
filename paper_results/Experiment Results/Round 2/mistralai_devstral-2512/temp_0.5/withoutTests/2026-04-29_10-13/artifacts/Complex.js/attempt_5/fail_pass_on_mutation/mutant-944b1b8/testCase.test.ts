// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-944b1b8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return correct result for asec(2)", () => {
    const result = new Complex(2, 0).asec();
    expect(result.re).toBeCloseTo(1.0471975511965976, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});