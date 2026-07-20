// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-34a2ed7/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should correctly parse complex numbers with leading plus operator', () => {
    const result = new Complex('+5+6i');
    expect(result.re).toBe(5);
    expect(result.im).toBe(6);
  });
});