// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-95362ed/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError for invalid input types", () => {
    expect(() => {
      const c = new Complex(null);
    }).toThrow(SyntaxError);

    expect(() => {
      const c = new Complex(undefined);
    }).toThrow(SyntaxError);

    expect(() => {
      const c = new Complex({ invalid: "object" });
    }).toThrow(SyntaxError);

    expect(() => {
      const c = new Complex("invalid+string+i");
    }).toThrow(SyntaxError);
  });
});