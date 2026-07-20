// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2834e3c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should handle the case where b !== 0 differently from b === 0", () => {
    const c1 = new Complex(0, 1); // b !== 0 case
    const c2 = new Complex(0, 0); // b === 0 case (special case)

    const result1 = c1.asech();
    const result2 = c2.asech();

    // The mutation changes (b !== 0) to (false), which should affect the b !== 0 case
    expect(result1.re).not.toBe(result2.re);
    expect(result1.im).not.toBe(result2.im);
  });
});