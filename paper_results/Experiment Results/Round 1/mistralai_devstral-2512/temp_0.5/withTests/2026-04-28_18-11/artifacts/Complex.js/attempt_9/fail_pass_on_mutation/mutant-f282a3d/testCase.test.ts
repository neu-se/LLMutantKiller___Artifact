// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f282a3d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with imaginary unit 'i' and not treat empty string as imaginary unit", () => {
    const result = new Complex("1+2i");
    expect(result.re).toBe(1);
    expect(result.im).toBe(2);

    // This will fail on mutated code where empty string is treated as imaginary unit
    // because "1+" should throw SyntaxError in original code but might parse differently in mutated code
    expect(() => new Complex("1+")).toThrow(SyntaxError);
  });
});