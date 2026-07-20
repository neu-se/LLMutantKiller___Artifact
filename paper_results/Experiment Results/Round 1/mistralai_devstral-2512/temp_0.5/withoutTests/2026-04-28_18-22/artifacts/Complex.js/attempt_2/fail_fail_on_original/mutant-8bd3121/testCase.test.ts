// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-8bd3121/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asech()', () => {
  it('should handle complex numbers with non-zero imaginary parts correctly', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0.8047189562170503, 10);
    expect(result.im).toBeCloseTo(-0.4636476090008061, 10);
  });
});