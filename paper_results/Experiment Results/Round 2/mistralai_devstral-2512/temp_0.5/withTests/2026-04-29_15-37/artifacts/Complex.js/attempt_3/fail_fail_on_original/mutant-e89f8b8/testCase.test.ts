// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-e89f8b8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc()', () => {
  it('should compute the correct cosecant value for a specific complex number', () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    // The mutation changes division to multiplication in the csc calculation
    // This will cause the result to be drastically different
    // We check specific expected values that would fail with multiplication
    expect(result.re).toBeCloseTo(0.6215180171704285, 10);
    expect(result.im).toBeCloseTo(-0.303925962210977, 10);
  });
});