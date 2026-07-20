// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-774f1f6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing with null', () => {
  it('should throw SyntaxError when parsing null', () => {
    expect(() => new Complex(null)).toThrow(SyntaxError);
  });
});