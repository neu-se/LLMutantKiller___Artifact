// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-27899a0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly handle real part = -1 with non-zero imaginary part", () => {
    const c = new Complex(-1, 1);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(-0.4024, 4);
    expect(result.im).toBeCloseTo(1.0172, 4);
  });
});