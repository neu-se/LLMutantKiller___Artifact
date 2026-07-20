// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-aafc8eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 using Taylor series for small x", () => {
    // Test with a value that will use the Taylor series approximation
    const x = 0.1;
    const c = new Complex(0, x); // Purely imaginary number
    const result = c.sin(); // sin(ix) = i*sinh(x), but this will trigger cosm1 internally
    // For small x, sinh(x) ≈ x + x^3/6 + x^5/120
    // So i*sinh(x) should be approximately i*(x + x^3/6)
    const expectedImag = x + Math.pow(x, 3)/6;
    expect(result.im).toBeCloseTo(expectedImag, 10);
  });
});