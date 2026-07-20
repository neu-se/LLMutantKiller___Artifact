// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c8c916d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly handle the case where a is non-zero and b is non-zero", () => {
    const result = new Complex(1, 1).acsc();
    expect(result.re).toBeCloseTo(0.45227844715119064, 10);
    expect(result.im).toBeCloseTo(-0.5306375309525179, 10);
  });
});