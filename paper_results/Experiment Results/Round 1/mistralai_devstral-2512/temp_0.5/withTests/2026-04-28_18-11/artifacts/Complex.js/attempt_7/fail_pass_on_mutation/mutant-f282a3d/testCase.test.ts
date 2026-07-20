// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f282a3d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with imaginary unit 'i' and reject empty string", () => {
    const result1 = new Complex("1+2i");
    expect(result1.re).toBe(1);
    expect(result1.im).toBe(2);

    // This should fail on mutated code where empty string is treated as imaginary unit
    const result2 = new Complex("1+2");
    expect(result2.re).toBe(3);
    expect(result2.im).toBe(0);
  });
});