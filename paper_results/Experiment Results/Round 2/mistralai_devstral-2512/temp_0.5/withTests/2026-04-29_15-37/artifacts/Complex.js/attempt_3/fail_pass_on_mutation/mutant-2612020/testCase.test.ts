// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2612020/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers from strings and maintain correct real part", () => {
    const c = new Complex("5+3i");
    expect(c.re).toBe(5);
    expect(c.im).toBe(3);
    expect(c[""]).toBeUndefined();
  });
});