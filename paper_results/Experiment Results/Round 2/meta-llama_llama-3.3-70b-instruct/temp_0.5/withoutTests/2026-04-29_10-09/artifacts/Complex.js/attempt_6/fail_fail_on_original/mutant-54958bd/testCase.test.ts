import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should throw an error when calculating acosh with the mutated code", () => {
    const complex = new Complex(Math.PI / 2, 0);
    const result = complex.acosh();
    expect(() => result[""]).toThrowError();
  });
});