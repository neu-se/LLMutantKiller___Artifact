// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2b36f89/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.csc", () => {
  it("should correctly compute the cosecant of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    const expectedRe = 0.6215947428772245;
    const expectedIm = -0.308508288719056;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});