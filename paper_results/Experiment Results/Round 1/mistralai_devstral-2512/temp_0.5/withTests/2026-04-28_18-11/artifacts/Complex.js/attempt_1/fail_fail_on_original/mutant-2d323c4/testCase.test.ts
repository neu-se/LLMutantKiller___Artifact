// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2d323c4/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute acsch for non-zero imaginary part", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.4161468365471424);
    expect(result.im).toBeCloseTo(-0.9045568943023814);
  });
});