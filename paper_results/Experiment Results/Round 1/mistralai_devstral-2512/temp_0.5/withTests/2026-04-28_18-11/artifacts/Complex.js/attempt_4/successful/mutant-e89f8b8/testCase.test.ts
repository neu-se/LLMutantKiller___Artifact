// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-e89f8b8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc()', () => {
  it('should correctly compute the cosecant of a complex number', () => {
    const z = new Complex(1, 1);
    const result = z.csc();
    // The mutation changes division by d to multiplication by d in the imaginary part calculation
    // This will significantly alter the result, making it easy to detect
    expect(result.re).toBeCloseTo(0.6215180171704285, 10);
    expect(result.im).toBeCloseTo(-0.30393100162842646, 10);
  });
});