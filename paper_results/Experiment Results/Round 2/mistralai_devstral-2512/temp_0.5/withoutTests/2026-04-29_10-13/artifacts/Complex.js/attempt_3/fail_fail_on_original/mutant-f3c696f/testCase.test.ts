// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f3c696f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should return correct result for acot(0, 0.5)", () => {
    const result = new Complex(0, 0.5).acot();
    expect(result.im).toBeCloseTo(-1.003987123584851);
  });
});