// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-24dde2e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should correctly compute the arcsecant of a complex number", () => {
    const c = new Complex(2, 3);
    const result = c.asec();
    // The mutation changes the denominator calculation in asec from a*a + b*b to a*a - b*b
    // This will produce different results for complex numbers with non-zero imaginary parts
    // We test against the actual computed value from the original implementation
    const expectedRe = 1.4204107224670346;
    const expectedIm = 0.23133469857397332;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});