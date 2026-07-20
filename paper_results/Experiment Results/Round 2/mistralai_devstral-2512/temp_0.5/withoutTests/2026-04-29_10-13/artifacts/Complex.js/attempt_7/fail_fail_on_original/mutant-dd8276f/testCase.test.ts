// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-dd8276f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should handle the case where real part is zero and imaginary part is non-zero", () => {
    const c = new Complex(0, 2);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-0.4406867935097715, 10);
  });
});