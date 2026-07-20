// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a9210c8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly handle complex numbers with non-zero imaginary part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sech();
    // The mutation changes this['im'] to this[""] which will cause incorrect calculation
    // For original code, sech(0.5+0.5i) should have specific real and imaginary parts
    expect(result.re).toBeCloseTo(0.5852, 4);
    expect(result.im).toBeCloseTo(-0.1538, 4);
  });
});