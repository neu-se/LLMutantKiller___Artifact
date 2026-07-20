import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw error when parsing object with only 'im' property", () => {
    expect(() => new Complex({ im: 3 })).toThrow(SyntaxError);
  });
});