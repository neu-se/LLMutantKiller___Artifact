// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-541c4eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly handle internal state during asinh calculation", () => {
    // Create a complex number where the mutation would cause observable difference
    const c = new Complex(0.7, 0.3);
    const result = c.asinh();

    // The mutation changes how internal state is manipulated during asinh calculation
    // This specific input should expose the difference between original and mutated code
    expect(result.re).toBeCloseTo(0.6365, 4);
    expect(result.im).toBeCloseTo(0.2925, 4);
  });
});