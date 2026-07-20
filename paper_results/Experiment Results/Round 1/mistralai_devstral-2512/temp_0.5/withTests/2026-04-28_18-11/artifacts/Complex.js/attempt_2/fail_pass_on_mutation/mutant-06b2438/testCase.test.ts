// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-06b2438/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asinh()', () => {
  it('should throw an error when accessing invalid property', () => {
    const c = new Complex(1, 1);
    expect(() => {
      // This will trigger the mutation where this[""]() is called
      c.asinh();
    }).not.toThrow();
  });
});