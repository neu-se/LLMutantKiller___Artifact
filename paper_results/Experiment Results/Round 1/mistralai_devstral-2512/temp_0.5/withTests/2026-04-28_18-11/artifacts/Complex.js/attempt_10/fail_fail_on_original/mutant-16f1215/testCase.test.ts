// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-16f1215/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsc() mutation test', () => {
  it('should correctly handle the case where both real and imaginary are non-zero', () => {
    const result = new Complex(1, 2).acsc();
    expect(result.re).toBeCloseTo(0.2518827232252209, 10);
    expect(result.im).toBeCloseTo(-0.3316497862332724, 10);
  });
});