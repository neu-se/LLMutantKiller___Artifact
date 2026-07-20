// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7abceb4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsch', () => {
  it('should handle purely imaginary numbers correctly', () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    // The mutation would incorrectly treat this as a real number (b === 0)
    // when it's actually purely imaginary, causing wrong behavior
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-0.881373587019543, 10);
  });
});