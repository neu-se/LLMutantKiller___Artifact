// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-103e5dc/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should correctly compute the cosecant of a complex number with non-zero real part", () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    // The expected result is computed based on the correct formula:
    // csc(a + bi) = 1 / sin(a + bi)
    // We can verify this by comparing with the inverse of sin
    const sinResult = c.sin();
    const expected = sinResult.inverse();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});