// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-103e5dc/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should correctly compute the cosecant for a specific complex number where the mutation would cause a difference", () => {
    const c = new Complex(2, 0); // Real number where a=2, b=0
    const result = c.csc();
    // For real numbers, csc(x) = 1/sin(x)
    // When a=2, the mutation changes Math.cos(2*a) to Math.cos(2/a)
    // This will produce different results since cos(4) != cos(1)
    const expectedRe = 1 / Math.sin(2);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});