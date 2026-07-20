// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ed9c36b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sec()", () => {
  it("should correctly compute sec for complex numbers with non-zero imaginary part", () => {
    const c = new Complex(0, 1);
    const result = c.sec();
    expect(result.re).toBeCloseTo(0.6480542736638855, 10);
    expect(result.im).toBeCloseTo(-0.402355876923691, 10);
  });
});