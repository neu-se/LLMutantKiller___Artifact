import { Complex } from "./complex.js";

describe("Complex.js", () => {
  it("should throw an error for atanh function with b === 0 when using the mutated code", () => {
    const complex = new Complex(1, 0);
    expect(() => complex.atanh()).not.toThrow();
  });
});