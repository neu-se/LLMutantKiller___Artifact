// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2b12188/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acosh mutation test', () => {
  it('should fail when res[""] is accessed instead of res["im"] in acosh', () => {
    const c = new Complex(2, 1);
    const result = c.acosh();
    // The mutation changes res['im'] to res[""] which will be undefined
    // This will cause the calculation to produce incorrect results
    expect(result.re).toBeCloseTo(1.4693517443681854);
    expect(result.im).toBeCloseTo(0.6435011087932844);
  });
});