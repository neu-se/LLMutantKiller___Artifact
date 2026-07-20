// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-90b49f6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should reject complex numbers with trailing plus operator", () => {
    // This test specifically targets the mutation where 'plus + minus > 0' was changed to 'plus - minus > 0'
    // In the original code, "1+2i+" should throw a SyntaxError because there's a trailing operator
    // In the mutated code, this might not throw an error in some cases due to the different condition

    expect(() => {
      new Complex("1+2i+");
    }).toThrow(SyntaxError);

    // Additional test case with trailing minus operator
    expect(() => {
      new Complex("3-4i-");
    }).toThrow(SyntaxError);

    // Test case with mixed operators that should be valid
    const validResult = new Complex("2+3i-1-2i");
    expect(validResult.re).toBeCloseTo(1);
    expect(validResult.im).toBeCloseTo(1);
  });
});