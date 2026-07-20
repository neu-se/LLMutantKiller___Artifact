// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9a23e8a/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a real number", () => {
    const z = new Complex(2, 0);
    const result = z.acsch();
    // Expected result for acsch(2) is approximately 0.48121182505960347
    expect(result.re).toBeCloseTo(0.48121182505960347);
    expect(result.im).toBeCloseTo(0);
  });
});