// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_8/pending_category/mutant-364057b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should correctly handle the case where real part is zero and magnitude is zero", () => {
    // Create a complex number that will trigger the mutant path
    const c = new Complex(0, 0);
    // Directly test the internal behavior by checking the result structure
    const result = c.asech();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});