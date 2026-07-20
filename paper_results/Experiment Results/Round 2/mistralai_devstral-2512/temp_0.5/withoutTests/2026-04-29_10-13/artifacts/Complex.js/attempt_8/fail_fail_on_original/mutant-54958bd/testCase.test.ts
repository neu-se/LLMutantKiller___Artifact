// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-54958bd/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly handle acosh for complex numbers with positive imaginary part", () => {
    const c = new Complex(0.5, 1);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(0.5306375309525178);
    expect(result.im).toBeCloseTo(-0.915965594177219);
  });
});