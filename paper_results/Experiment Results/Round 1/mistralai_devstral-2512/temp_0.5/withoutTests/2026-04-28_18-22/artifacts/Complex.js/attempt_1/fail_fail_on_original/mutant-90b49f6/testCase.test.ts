// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-90b49f6/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with trailing operators", () => {
    // This test case should fail in the mutated version because the condition
    // `plus - minus > 0` will incorrectly handle cases where plus and minus
    // have the same value but opposite signs.
    expect(() => new Complex("1+2i+")).toThrow(SyntaxError);
  });
});