// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3d05257/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly compute acosh for a complex number with positive imaginary part", () => {
    const c = new Complex(2, 3);
    const result = c.acosh();
    // The mutation changes res['re'] = -res['im'] to res['re'] = -res[""]
    // This will cause the real part to be NaN (since res[""] is undefined)
    // while the original code should produce a valid number
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});