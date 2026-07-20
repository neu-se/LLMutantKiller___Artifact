// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-44bef4d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute acsc for a complex number where b and d are non-zero", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acsc();
    // The mutation changes -b/d to -b*d in the acsc calculation
    // This specific input will expose the difference between division and multiplication
    expect(result.re).toBeCloseTo(0.45227844715119064);
    expect(result.im).toBeCloseTo(-0.45227844715119064);
  });
});