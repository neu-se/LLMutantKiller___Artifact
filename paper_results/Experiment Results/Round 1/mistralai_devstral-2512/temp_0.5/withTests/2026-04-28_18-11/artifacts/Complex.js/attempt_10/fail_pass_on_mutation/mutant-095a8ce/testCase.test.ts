// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-095a8ce/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return the correct complex number when input is (0, 0)", () => {
    const result = new Complex(0, 0).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2);
    expect(result.im).toBe(Infinity);
  });
});