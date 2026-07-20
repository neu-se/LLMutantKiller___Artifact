// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-8bd3121/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should handle complex numbers with zero real part", () => {
    const c = new Complex(0, 0.5);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-1.5707963267948966);
  });
});