// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3396602/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc', () => {
  it('should compute the cosecant of a complex number with real part close to π/2', () => {
    const c = new Complex(Math.PI / 2, 0.1);
    const result = c.csc();
    expect(result.re).toBeCloseTo(1.0, 10);
    expect(result.im).toBeCloseTo(-0.1001674211615598, 10);
  });
});