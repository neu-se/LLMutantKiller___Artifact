// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-337791e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.exp()', () => {
  it('should handle pure imaginary numbers correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.exp();
    expect(result.re).toBeCloseTo(Math.cos(1));
    expect(result.im).toBeCloseTo(Math.sin(1));
  });
});