// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f11d464/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.pow", () => {
  it("should correctly compute power when base is purely imaginary", () => {
    const base = new Complex(0, 2); // Purely imaginary number 2i
    const exponent = new Complex(3, 0); // Real exponent 3
    const result = base.pow(exponent);
    // (2i)^3 = 8i^3 = 8*(-i) = -8i
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-8);
  });
});