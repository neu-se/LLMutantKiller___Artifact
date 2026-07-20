// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-286c16a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh", () => {
  it("should compute the hyperbolic arcsine of a complex number", () => {
    const z = new Complex(1, 1);
    const result = z.asinh();
    expect(result.re).toBeCloseTo(1.0613, 3);
    expect(result.im).toBeCloseTo(0.6662, 3);
  });
});