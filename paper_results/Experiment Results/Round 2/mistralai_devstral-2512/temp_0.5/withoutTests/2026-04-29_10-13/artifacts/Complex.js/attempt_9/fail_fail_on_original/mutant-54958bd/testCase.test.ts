// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-54958bd/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly handle acosh for complex numbers with positive imaginary part", () => {
    // This test specifically targets the mutation where res['re'] is changed to res[""]
    // Using a complex number that will trigger the code path with the mutation
    const c = new Complex(1, 2);
    const result = c.acosh();
    // The mutation would cause incorrect property access, leading to wrong results
    expect(result.re).toBeCloseTo(1.261858017212823);
    expect(result.im).toBeCloseTo(-1.000247856222528);
  });
});