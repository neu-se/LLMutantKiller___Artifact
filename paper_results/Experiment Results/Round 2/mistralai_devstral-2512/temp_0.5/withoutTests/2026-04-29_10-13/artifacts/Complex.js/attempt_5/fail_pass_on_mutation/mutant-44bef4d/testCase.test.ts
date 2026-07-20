// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-44bef4d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute acsc for a complex number with specific properties", () => {
    const c = new Complex(1, 0);
    const result = c.acsc();
    // For input (1, 0), acsc should return (π/2, 0)
    // The mutation changes -b/d to -b*d which will affect this calculation
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});