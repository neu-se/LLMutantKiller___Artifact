// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-541c4eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute the inverse hyperbolic sine of a complex number", () => {
    const c = new Complex(0, 1);
    const result = c.asinh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0.881373587019543, 10);
  });
});