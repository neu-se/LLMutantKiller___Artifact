// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f11d464/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly compute power for fully imaginary base with exponent 1", () => {
    const base = new Complex(0, 5);
    const exponent = new Complex(1, 0);
    const result = base.pow(exponent);
    // (0 + 5i)^1 = 5i
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(5);
  });
});