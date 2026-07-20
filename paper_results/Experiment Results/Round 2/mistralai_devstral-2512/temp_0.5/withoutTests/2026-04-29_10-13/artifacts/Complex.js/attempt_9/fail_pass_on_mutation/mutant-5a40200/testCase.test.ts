// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5a40200/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should use exponential formula for x = 1e-9", () => {
    const z = new Complex(1e-9, 0);
    const result = z.cosh();

    // Calculate what each version would produce
    const exponentialResult = (Math.exp(1e-9) + Math.exp(-1e-9)) * 0.5;
    const taylorResult = 1 - 1e-9;

    // Original should use exponential formula (result ≈ 1.0000000000005)
    // Mutated would use Taylor approximation (result = 0.999999999)
    expect(result.re).toBeCloseTo(exponentialResult, 12);
    expect(result.re).not.toBeCloseTo(taylorResult, 12);
    expect(result.im).toBeCloseTo(0, 12);
  });
});