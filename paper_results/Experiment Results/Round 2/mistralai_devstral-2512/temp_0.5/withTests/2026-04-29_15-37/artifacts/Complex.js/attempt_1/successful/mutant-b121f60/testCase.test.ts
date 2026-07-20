// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b121f60/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing with scientific notation', () => {
  it('should correctly parse complex numbers with scientific notation exponents', () => {
    // This test targets the regex mutation that changes e[+-]?\d+ to e[+-]?\d
    // The original regex allows multi-digit exponents (e.g., e+10, e-23)
    // The mutated regex only allows single-digit exponents (e.g., e+1, e-2)
    const result = new Complex('1.5e+10+2.5e-20i');
    expect(result.re).toBeCloseTo(1.5e+10);
    expect(result.im).toBeCloseTo(2.5e-20);
  });
});