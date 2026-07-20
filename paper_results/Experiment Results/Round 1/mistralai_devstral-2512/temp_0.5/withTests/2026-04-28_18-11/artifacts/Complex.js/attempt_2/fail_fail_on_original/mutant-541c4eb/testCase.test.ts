// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-541c4eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly handle the internal state manipulation during asinh calculation", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asinh();
    // The mutation changes how internal state is manipulated during asinh calculation
    // This test verifies the correct behavior by checking the result
    expect(result.re).toBeCloseTo(0.4228350337665848, 10);
    expect(result.im).toBeCloseTo(0.5739751991292237, 10);
  });
});