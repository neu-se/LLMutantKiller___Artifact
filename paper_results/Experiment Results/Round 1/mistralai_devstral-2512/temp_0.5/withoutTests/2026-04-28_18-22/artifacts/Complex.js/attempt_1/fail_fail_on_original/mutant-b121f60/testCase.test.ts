// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b121f60/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with scientific notation exponents", () => {
    const c = new Complex("1.5e+2+3.7e-1i");
    expect(c.re).toBeCloseTo(150);
    expect(c.im).toBeCloseTo(0.37);
  });
});