// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-246ab6e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should verify the mathematical identity cosh(x) = (exp(x) + exp(-x))/2", () => {
    const x = 1.5;
    const z = new Complex(x, 0);
    const result = z.cosh();
    // Directly test the mathematical definition
    const expected = (Math.exp(x) + Math.exp(-x)) * 0.5;
    // The mutation changes this to (exp(x) + exp(+x))/2 which equals exp(x)
    // For x=1.5: correct value ≈ 2.352409615243247
    // Mutated value would be ≈ 4.4816890703380645
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});