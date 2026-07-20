// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d5fa407/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acot()", () => {
  it("should correctly handle the case when both real and imaginary parts are zero", () => {
    const result = new Complex(0, 0).acot();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Math.PI / 2);
  });
});