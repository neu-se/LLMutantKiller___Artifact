// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-90b49f6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with trailing operators", () => {
    // This test targets the mutation in the parser where 'plus + minus > 0' was changed to 'plus - minus > 0'
    // The original code correctly rejects strings like "1+2i+" (trailing operator)
    // The mutated code would incorrectly accept such strings in some cases

    // Test case that should throw a SyntaxError in both original and mutated code
    // but demonstrates the difference in parsing behavior
    expect(() => {
      new Complex("1+2i+");
    }).toThrow(SyntaxError);

    // Test case that specifically targets the mutation
    // The original code correctly handles "1+2i-3" (no trailing operator)
    const result = new Complex("1+2i-3");
    expect(result.re).toBeCloseTo(-2);
    expect(result.im).toBeCloseTo(2);

    // Additional test case with multiple operators
    const result2 = new Complex("5-3i+2-1i");
    expect(result2.re).toBeCloseTo(7);
    expect(result2.im).toBeCloseTo(-4);
  });
});