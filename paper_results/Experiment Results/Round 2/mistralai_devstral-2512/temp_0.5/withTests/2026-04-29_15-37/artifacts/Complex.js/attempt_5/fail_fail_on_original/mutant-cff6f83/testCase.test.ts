// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-cff6f83/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute acsch(1,1) with specific precision", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // The mutation changes a/d to a*d in the acsch implementation
    // This will cause significantly different results that we can detect
    expect(result.re).toBeCloseTo(0.48121182505960347, 6);
    expect(result.im).toBeCloseTo(-0.48121182505960347, 6);
  });
});