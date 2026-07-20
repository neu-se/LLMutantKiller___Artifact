// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-92423c6/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // The mutation changes the sign in the Taylor series approximation of cosm1
    // This test uses a small x value where the Taylor series approximation is used
    const x = 0.1;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // For small x, expm1(x) should be approximately x + x^2/2 + x^3/6 + ...
    // The real part should be expm1(x) which is cos(0) - 1 + expm1(x)*cos(0) = expm1(x)
    // The imaginary part should be 0 since sin(0) = 0
    expect(result.re).toBeCloseTo(Math.expm1(x), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});