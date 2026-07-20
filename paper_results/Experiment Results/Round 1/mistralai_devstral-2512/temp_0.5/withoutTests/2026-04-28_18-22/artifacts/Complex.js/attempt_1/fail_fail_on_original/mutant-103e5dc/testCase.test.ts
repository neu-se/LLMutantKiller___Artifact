// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-103e5dc/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should correctly compute csc for a complex number with non-zero real part", () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    expect(result.re).toBeCloseTo(0.6420926159343306, 10);
    expect(result.im).toBeCloseTo(-0.217563219949588, 10);
  });
});