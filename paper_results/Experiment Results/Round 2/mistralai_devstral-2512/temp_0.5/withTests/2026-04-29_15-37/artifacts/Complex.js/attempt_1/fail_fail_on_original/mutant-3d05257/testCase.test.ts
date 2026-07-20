// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3d05257/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acosh()", () => {
  it("should correctly compute acosh for a complex number with positive imaginary part", () => {
    const c = new Complex(2, 3);
    const result = c.acosh();
    // Expected behavior: acosh(2+3i) should return a complex number with specific real and imaginary parts
    // The mutation changes res['re'] = -res['im'] to res['re'] = -res[""], which will cause incorrect results
    expect(result.re).toBeCloseTo(1.9833870299165354);
    expect(result.im).toBeCloseTo(0.9624236501192069);
  });
});