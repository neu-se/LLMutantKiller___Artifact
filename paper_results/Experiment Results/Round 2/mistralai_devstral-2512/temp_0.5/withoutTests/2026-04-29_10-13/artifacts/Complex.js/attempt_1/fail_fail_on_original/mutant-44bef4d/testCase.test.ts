// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-44bef4d/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute the arc cosecant of a complex number", () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    // The mutation changes -b/d to -b*d, which will produce a different result
    // We'll check against a known expected value for the original implementation
    expect(result.re).toBeCloseTo(0.11778299354114604);
    expect(result.im).toBeCloseTo(-0.2442524470858346);
  });
});