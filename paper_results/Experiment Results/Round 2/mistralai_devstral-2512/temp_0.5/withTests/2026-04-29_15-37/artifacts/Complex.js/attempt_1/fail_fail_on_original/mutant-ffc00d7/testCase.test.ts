// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ffc00d7/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with imaginary unit at the end", () => {
    const result = new Complex("1+2i");
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(2);
  });
});