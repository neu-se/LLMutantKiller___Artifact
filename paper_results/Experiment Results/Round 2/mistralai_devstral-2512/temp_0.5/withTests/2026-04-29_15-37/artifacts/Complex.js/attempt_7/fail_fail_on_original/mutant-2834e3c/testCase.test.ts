// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2834e3c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly handle non-zero imaginary part in asech calculation", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The mutation changes (b !== 0) to (false) which should affect the calculation
    // when b is not 0 (which is the case here with b=0.5)
    expect(result.re).toBeCloseTo(1.4436354751788103, 10);
    expect(result.im).toBeCloseTo(-0.5493061443340548, 10);
  });
});