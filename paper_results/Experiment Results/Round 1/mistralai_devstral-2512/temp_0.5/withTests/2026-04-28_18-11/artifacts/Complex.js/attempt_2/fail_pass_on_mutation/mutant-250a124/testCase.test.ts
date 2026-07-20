// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-250a124/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when the divisor's real part is smaller than its imaginary part", () => {
    const a = new Complex(2, 3);
    const b = new Complex(1, 2);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(1.6, 10);
    expect(result.im).toBeCloseTo(-0.2, 10);
  });
});