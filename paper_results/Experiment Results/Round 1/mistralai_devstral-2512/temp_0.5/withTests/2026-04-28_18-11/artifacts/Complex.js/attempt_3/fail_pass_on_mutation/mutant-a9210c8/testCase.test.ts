// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a9210c8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute sech for a purely real number", () => {
    const c = new Complex(1, 0);
    const result = c.sech();
    // sech(1) = 2 / (e^1 + e^-1) ≈ 0.6480542736638855
    expect(result.re).toBeCloseTo(0.6480542736638855, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});