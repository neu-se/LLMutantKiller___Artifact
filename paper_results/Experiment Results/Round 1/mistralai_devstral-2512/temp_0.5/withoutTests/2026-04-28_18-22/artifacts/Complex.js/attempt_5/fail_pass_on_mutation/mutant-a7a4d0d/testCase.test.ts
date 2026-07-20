// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a7a4d0d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should produce correct real and imaginary parts for acosh(1, 0)", () => {
    const c = new Complex(1, 0);
    const result = c.acosh();
    // For acosh(1, 0), the result should be (0, 0) since acosh(1) = 0
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});