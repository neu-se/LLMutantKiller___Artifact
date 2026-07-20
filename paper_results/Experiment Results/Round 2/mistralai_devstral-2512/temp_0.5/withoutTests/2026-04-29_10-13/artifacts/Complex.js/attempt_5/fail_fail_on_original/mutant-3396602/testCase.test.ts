// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3396602/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc', () => {
  it('should compute the cosecant of a complex number with small real part', () => {
    const c = new Complex(0.1, 0.1);
    const result = c.csc();
    expect(result.re).toBeCloseTo(9.96664442345802, 10);
    expect(result.im).toBeCloseTo(-0.4966655557654198, 10);
  });
});