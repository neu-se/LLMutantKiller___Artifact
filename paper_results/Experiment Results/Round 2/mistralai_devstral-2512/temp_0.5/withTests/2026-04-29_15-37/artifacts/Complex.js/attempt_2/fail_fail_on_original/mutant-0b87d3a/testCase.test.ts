// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0b87d3a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should return correct value for non-zero complex number", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.6615931248652339);
    expect(result.im).toBeCloseTo(-0.48121182505960347);
  });
});