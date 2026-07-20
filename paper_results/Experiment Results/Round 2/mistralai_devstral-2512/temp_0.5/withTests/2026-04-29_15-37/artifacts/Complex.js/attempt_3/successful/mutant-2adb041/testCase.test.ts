// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2adb041/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute expm1 for small complex numbers", () => {
    const z = new Complex(0.1, 0.1);
    const expm1 = z.expm1();
    const expectedRe = Math.expm1(0.1) * Math.cos(0.1) + (Math.cos(0.1) - 1);
    const expectedIm = Math.exp(0.1) * Math.sin(0.1);
    expect(expm1.re).toBeCloseTo(expectedRe, 10);
    expect(expm1.im).toBeCloseTo(expectedIm, 10);
  });
});