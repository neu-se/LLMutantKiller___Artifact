// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7e41260/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when divisor's real part is larger than imaginary part", () => {
    const a = new Complex(4, 2);
    const b = new Complex(2, 1);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});