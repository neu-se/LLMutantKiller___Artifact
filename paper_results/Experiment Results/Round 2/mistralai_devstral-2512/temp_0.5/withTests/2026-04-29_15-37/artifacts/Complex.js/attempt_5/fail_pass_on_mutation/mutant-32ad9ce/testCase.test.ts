// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-32ad9ce/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing with NaN values', () => {
  it('should handle mixed NaN and valid components correctly', () => {
    const c1 = new Complex({ re: NaN, im: 0 });
    const c2 = new Complex({ re: 0, im: NaN });
    const c3 = new Complex({ re: NaN, im: NaN });

    expect(c1.isNaN()).toBe(true);
    expect(c2.isNaN()).toBe(true);
    expect(c3.isNaN()).toBe(true);
  });
});