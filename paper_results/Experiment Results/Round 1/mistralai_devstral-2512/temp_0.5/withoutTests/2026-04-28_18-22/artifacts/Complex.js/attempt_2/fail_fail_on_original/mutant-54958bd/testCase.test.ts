// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-54958bd/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly compute acosh for a complex number with negative imaginary part", () => {
    const c = new Complex(2, -3);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(1.9833870299506474);
    expect(result.im).toBeCloseTo(-0.9624236501192069);
  });
});