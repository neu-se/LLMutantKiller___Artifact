// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-541c4eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute asinh for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(2, 3);
    const result = c.asinh();
    expect(result.re).toBeCloseTo(1.968637925793096, 10);
    expect(result.im).toBeCloseTo(0.9620807652133657, 10);
  });
});