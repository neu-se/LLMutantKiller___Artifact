// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b43cd5f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing with whitespace', () => {
  it('should correctly parse complex numbers with newline characters between number and operator', () => {
    const result = new Complex('4\n+5i');
    expect(result.re).toBe(4);
    expect(result.im).toBe(5);
  });
});