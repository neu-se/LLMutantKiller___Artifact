// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-24dde2e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should correctly compute the arcsecant of a complex number", () => {
    const c = new Complex(2, 3);
    const result = c.asec();
    // The mutation changes d = a*a + b*b to d = a*a - b*b in the asec method
    // This will affect the computation when both real and imaginary parts are non-zero
    // We test with a known value to ensure the mutation breaks the expected behavior
    expect(result.re).toBeCloseTo(0.443, 3);
    expect(result.im).toBeCloseTo(-1.031, 3);
  });
});