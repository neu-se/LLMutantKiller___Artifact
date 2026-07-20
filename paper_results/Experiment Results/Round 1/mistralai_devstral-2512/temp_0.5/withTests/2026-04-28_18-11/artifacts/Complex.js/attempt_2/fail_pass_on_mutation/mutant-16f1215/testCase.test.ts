// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-16f1215/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsc() mutation test', () => {
  it('should correctly handle acsc(0 + 0i) case', () => {
    const result = new Complex(0, 0).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2);
    expect(result.im).toBe(Infinity);
  });
});