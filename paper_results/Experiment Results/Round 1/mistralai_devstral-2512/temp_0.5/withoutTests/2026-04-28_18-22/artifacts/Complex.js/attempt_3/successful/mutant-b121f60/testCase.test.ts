// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b121f60/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with two-digit scientific notation exponents", () => {
    const c = new Complex("1.5e+10+3.7e-10i");
    expect(c.re).toBeCloseTo(1.5e10);
    expect(c.im).toBeCloseTo(3.7e-10);
  });
});