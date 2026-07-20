// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-af30606/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should correctly compute the hyperbolic secant for a complex number with real part 1", () => {
    const c = new Complex(1, 0);
    const result = c.sech();

    // For a purely real number (b=0), sech(a) should equal 1/cosh(a)
    const expected = 1 / Math.cosh(1);
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});