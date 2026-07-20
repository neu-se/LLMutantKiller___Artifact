import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw error when object has neither 're' nor 'im' nor polar properties", () => {
    expect(() => new Complex({ x: 1, y: 2 })).toThrow(SyntaxError);
  });
});