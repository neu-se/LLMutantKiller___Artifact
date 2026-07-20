// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-aafc8eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number expm1 function", () => {
  it("should correctly compute expm1 for purely imaginary numbers", () => {
    // Test with a purely imaginary number where cosm1 is used
    const x = 0.5;
    const c = new Complex(0, x);
    const result = c.expm1();

    // exp(i*x) - 1 = cos(x) - 1 + i*sin(x)
    const expectedReal = Math.cos(x) - 1;
    const expectedImag = Math.sin(x);

    // Check both real and imaginary parts
    expect(result.re).toBeCloseTo(expectedReal, 10);
    expect(result.im).toBeCloseTo(expectedImag, 10);
  });
});