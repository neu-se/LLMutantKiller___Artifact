// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-774f1f6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing with no arguments', () => {
  it('should create a complex number with re=0 and im=0 when no arguments are provided', () => {
    const c = new Complex();
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});