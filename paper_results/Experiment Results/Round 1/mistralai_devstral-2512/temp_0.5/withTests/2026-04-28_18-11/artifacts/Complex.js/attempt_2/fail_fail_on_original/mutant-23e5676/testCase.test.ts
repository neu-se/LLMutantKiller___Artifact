// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-23e5676/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsc()', () => {
  it('should compute the correct arc cosecant for a specific complex number', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acsc();
    // The mutation changes a/d to a*d in the acsc method
    // For this specific input, we expect a particular result that will differ
    // when the mutation is present
    expect(result.re).toBeCloseTo(0.4023594781, 8);
    expect(result.im).toBeCloseTo(-1.0172219679, 8);
  });
});