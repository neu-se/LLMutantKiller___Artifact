// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-06b2438/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should produce correct results for complex inputs with both real and imaginary parts", () => {
    const c = new Complex(2, 3);
    const result = c.asinh();
    // The mutation breaks the acos call which affects the calculation
    // These values are specifically chosen to expose the mutation
    expect(result.re).toBeCloseTo(1.968637925793029, 10);
    expect(result.im).toBeCloseTo(0.962080764910298, 10);
  });
});