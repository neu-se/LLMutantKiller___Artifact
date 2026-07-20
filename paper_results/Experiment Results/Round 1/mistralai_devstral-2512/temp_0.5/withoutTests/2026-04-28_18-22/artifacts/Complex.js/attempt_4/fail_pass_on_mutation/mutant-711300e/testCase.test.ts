import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw error when object has neither 're' nor 'im' properties", () => {
    expect(() => new Complex({ other: 5 })).toThrow(SyntaxError);
  });
});