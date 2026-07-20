// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-61eed2d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing from string', () => {
  it('should correctly parse a complex number with decimal values', () => {
    const result = new Complex('1.5-2.5i');
    expect(result.re).toBe(1.5);
    expect(result.im).toBe(-2.5);
  });
});