// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fac1911/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should compute acsch correctly for (1,1) and produce expected real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // These are the correct expected values for acsch(1+1i)
    expect(result.re).toBeCloseTo(0.5306375309525179, 10);
    expect(result.im).toBeCloseTo(-0.4439035729567415, 10);
  });
});