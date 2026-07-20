// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-774f1f6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing with polar form', () => {
  it('should correctly parse complex number from polar form with abs and arg', () => {
    const c = new Complex({ abs: 2, arg: Math.PI/4 });
    expect(c.re).toBeCloseTo(Math.sqrt(2));
    expect(c.im).toBeCloseTo(Math.sqrt(2));
  });
});