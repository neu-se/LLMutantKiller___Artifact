// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-541c4eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should produce consistent results for asinh calculation", () => {
    const c = new Complex(1, 1);
    const result1 = c.asinh();
    const result2 = c.asinh();
    // The mutation changes this['re'] = -this['im'] to this['re'] = -this[""]
    // This will cause inconsistent results between calls
    expect(result1.re).toBe(result2.re);
    expect(result1.im).toBe(result2.im);
  });
});