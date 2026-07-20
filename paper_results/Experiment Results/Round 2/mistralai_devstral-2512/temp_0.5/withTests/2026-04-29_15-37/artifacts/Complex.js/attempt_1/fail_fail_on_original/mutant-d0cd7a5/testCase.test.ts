// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d0cd7a5/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.4161468365471424, 10);
    expect(result.im).toBeCloseTo(-0.9272952180016122, 10);
  });
});