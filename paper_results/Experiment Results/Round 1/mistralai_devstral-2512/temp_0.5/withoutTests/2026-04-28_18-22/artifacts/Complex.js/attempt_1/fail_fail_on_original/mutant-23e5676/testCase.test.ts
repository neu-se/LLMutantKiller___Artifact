// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-23e5676/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acsc", () => {
  it("should correctly compute the arc cosecant for a specific complex number", () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    // The mutation changes division to multiplication, which would significantly alter the result
    // We test against a known expected value for the original implementation
    expect(result.re).toBeCloseTo(0.1459, 4);
    expect(result.im).toBeCloseTo(-0.1031, 4);
  });
});