// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7190cb4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should return correct imaginary part for (0,0) input", () => {
    const result = new Complex(0, 0).acsc();
    // The original code should return +Infinity for the imaginary part
    // The mutated code would return -Infinity due to the sign change
    expect(result.im).toBe(Infinity);
    expect(result.re).toBe(Math.PI / 2);
  });
});