// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-03e5dd4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with newline characters", () => {
  it("should correctly parse complex numbers with newline characters in the string representation", () => {
    const complexStr = "3\n+4i";
    const expected = new Complex(3, 4);
    const result = new Complex(complexStr);
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});