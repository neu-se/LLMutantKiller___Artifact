// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-54958bd/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly handle acosh for complex numbers with positive imaginary part", () => {
    // This test targets the specific mutation in acosh where res['re'] is changed to res[""]
    // Using a complex number that will definitely trigger the mutated code path
    const c = new Complex(0, 1); // Purely imaginary number
    const result = c.acosh();
    // The mutation would cause incorrect property access, leading to wrong results
    // For acosh(0 + 1i), the expected result should be:
    expect(result.re).toBeCloseTo(0.8813735870195429);
    expect(result.im).toBeCloseTo(-0.7853981633974483);
  });
});