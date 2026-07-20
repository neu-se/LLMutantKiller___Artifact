// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_4/pending_category/mutant-2b36f89/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc", () => {
  it("should correctly compute the cosecant of a complex number with real part 1 and imaginary part 1", () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    const expectedRe = 0.6215180171704285;
    const expectedIm = -0.30393100162842646;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});