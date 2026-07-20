// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fdf297b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex subtraction with infinity', () => {
  it('should return NaN when subtracting two infinite complex numbers', () => {
    const infinite1 = new Complex(Infinity, Infinity);
    const infinite2 = new Complex(Infinity, Infinity);
    const result = infinite1.sub(infinite2);
    expect(result.isNaN()).toBe(true);
  });
});