// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea120d1/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.logHypot", () => {
  it("should correctly compute logHypot for values where b equals 3000", () => {
    const a = 1;
    const b = 3000;
    const c = new Complex(a, b);
    const result = c.log();
    const expectedRe = Math.log(Math.sqrt(a * a + b * b));
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});