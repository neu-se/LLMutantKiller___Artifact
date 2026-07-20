import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should throw an error when acsc is called with a and b as 0 in the mutated code", () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsc()).toThrowError(SyntaxError);
  });
});