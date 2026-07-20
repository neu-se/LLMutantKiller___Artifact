// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0b87d3a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should return the correct arc cosecant for a non-zero complex number", () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    // The mutation changes the condition from (d !== 0) to (d === 0)
    // This test ensures we're testing the correct branch by using a non-zero complex number
    // The expected values are calculated based on the formula: acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))
    expect(result.re).toBeCloseTo(0.1504, 4);
    expect(result.im).toBeCloseTo(-0.2313, 4);
  });
});