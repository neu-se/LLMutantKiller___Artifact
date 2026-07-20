// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fc65420/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acsch()", () => {
  it("should return Infinity for real zero input", () => {
    const result = new Complex(0, 0).acsch();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});