// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-103e5dc/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should correctly compute csc for a complex number with real part 0.2 and imaginary part 0.2", () => {
    const c = new Complex(0.2, 0.2);
    const result = c.csc();
    expect(result.re).toBeCloseTo(2.4999999999999996, 6);
    expect(result.im).toBeCloseTo(-0.000000000000000, 6);
  });
});