// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fd77132/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex asec function", () => {
  it("should compute the arcsecant of a complex number", () => {
    const c = new Complex(2, 0);
    const result = c.asec();
    expect(result.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});