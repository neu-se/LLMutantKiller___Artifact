// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-03e5dd4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should correctly handle empty string in complex number input', () => {
    expect(() => new Complex('3+4i')).not.toThrow();
    expect(() => new Complex('3+4i ')).not.toThrow();
    expect(() => new Complex('3+4i\t')).not.toThrow();
    expect(() => new Complex('3+4i\n')).not.toThrow();
    expect(() => new Complex('3+4i\r')).not.toThrow();
  });
});