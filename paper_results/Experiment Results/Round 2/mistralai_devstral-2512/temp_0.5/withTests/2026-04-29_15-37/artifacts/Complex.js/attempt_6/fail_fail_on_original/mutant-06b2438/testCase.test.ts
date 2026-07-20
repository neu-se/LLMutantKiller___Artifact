// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-06b2438/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should produce correct results that depend on the acos implementation", () => {
    const c = new Complex(0, 0.5);
    const result = c.asinh();
    // The mutation breaks the acos call which affects the calculation
    // These values are specifically chosen to expose the mutation
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0.48121182505960347, 10);
  });
});