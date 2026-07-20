// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f11d464/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow() with purely imaginary base", () => {
  it("should correctly handle the case when base is purely imaginary (a=0)", () => {
    const base = new Complex(0, 2); // Purely imaginary number: 2i
    const exponent = 2; // Real exponent
    const result = base.pow(exponent);
    // The mutation changes the condition from "a === 0" to "false",
    // which should cause this test to fail as it won't take the special case path
    // Expected: (2i)^2 = -4
    expect(result.re).toBeCloseTo(-4);
    expect(result.im).toBeCloseTo(0);
  });
});