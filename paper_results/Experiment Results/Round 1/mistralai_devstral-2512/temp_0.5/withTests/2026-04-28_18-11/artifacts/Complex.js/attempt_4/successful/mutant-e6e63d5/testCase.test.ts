// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-e6e63d5/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should compute the arc cosecant of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result).toBeInstanceOf(Complex);
    expect(result.re).toBeCloseTo(0.45227844715119064, 10);
    expect(result.im).toBeCloseTo(-0.5306375309525179, 10);
  });
});