// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0acca01/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acoth()", () => {
  it("should correctly compute acoth for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    // The mutation changes division to multiplication, which will produce a significantly different result
    // For the original code, acoth(2+3i) should be approximately 0.1469 + 1.3389i
    expect(result.re).toBeCloseTo(0.1469, 4);
    expect(result.im).toBeCloseTo(1.3389, 4);
  });
});