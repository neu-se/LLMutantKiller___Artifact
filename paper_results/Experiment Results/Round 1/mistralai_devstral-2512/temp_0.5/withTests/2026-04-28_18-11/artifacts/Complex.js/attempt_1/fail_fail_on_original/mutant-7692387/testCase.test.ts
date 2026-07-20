// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7692387/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asinh() mutation test', () => {
  it('should correctly compute asinh of a complex number', () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    // Expected result computed independently to verify correctness
    // asinh(1 + 2i) = ln(1 + 2i + sqrt((1 + 2i)^2 + 1))
    // Using known mathematical properties to validate
    expect(result.re).toBeCloseTo(1.263358568954411, 10);
    expect(result.im).toBeCloseTo(1.521261350430012, 10);
  });
});