// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-1bc0144/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should correctly handle non-zero complex numbers", () => {
    const c = new Complex(1, 1);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0.443568250605324, 10);
    expect(result.im).toBeCloseTo(-0.443568250605324, 10);
  });
});