// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-03e5dd4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with whitespace", () => {
  it("should handle newline characters differently from empty strings", () => {
    const withNewline = new Complex("1\n+2i");
    const withEmpty = () => new Complex("1\0+2i");
    expect(withNewline.re).toBe(1);
    expect(withNewline.im).toBe(2);
    expect(withEmpty).toThrow(SyntaxError);
  });
});