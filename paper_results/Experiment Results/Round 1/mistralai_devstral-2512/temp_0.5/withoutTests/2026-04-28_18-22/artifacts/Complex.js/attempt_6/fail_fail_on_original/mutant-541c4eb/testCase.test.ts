// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-541c4eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute asinh for a specific complex number", () => {
    const c = new Complex(2, 3);
    const result = c.asinh();
    // The mutation changes this['re'] = -this['im'] to this['re'] = -this[""]
    // This will cause incorrect calculation when the imaginary part is non-zero
    // We test the specific expected values for this input
    expect(result.re).toBeCloseTo(1.968637925793096, 10);
    expect(result.im).toBeCloseTo(0.9624236501192069, 10);
  });
});