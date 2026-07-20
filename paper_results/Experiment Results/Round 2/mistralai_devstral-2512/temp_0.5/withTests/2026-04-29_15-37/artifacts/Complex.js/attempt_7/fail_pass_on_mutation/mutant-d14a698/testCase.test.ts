// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_7/pending_category/mutant-d14a698/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should return the correct arcsecant for a purely imaginary number with negative imaginary part", () => {
    const c = new Complex(0, -1);
    const result = c.asec();
    expect(result.re).toBeCloseTo(1.5707963267948966);
    expect(result.im).toBeCloseTo(-0.8813735870195428);
  });
});