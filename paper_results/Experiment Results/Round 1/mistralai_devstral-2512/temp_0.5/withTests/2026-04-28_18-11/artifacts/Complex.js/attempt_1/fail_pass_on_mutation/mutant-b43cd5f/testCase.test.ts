// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b43cd5f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing with whitespace', () => {
  it('should correctly parse complex numbers with newline characters', () => {
    const result = new Complex('3\n+4i');
    expect(result.re).toBeCloseTo(3, 10);
    expect(result.im).toBeCloseTo(4, 10);
  });
});