// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-e89f8b8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc()', () => {
  it('should correctly compute the cosecant of a complex number with specific values', () => {
    const z = new Complex(2, 3);
    const result = z.csc();
    // The mutation changes division by d to multiplication by d in the imaginary part calculation
    // This will significantly alter the result, making it easy to detect
    expect(result.re).toBeCloseTo(0.090514825364, 10);
    expect(result.im).toBeCloseTo(-0.082273165048, 10);
  });
});