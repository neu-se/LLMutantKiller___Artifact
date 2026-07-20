// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-541c4eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute asinh for a complex number with specific values", () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    // These values are calculated from the original implementation
    // The mutation will cause different results due to incorrect state manipulation
    expect(result.re).toBeCloseTo(1.4643, 4);
    expect(result.im).toBeCloseTo(1.0172, 4);
  });
});