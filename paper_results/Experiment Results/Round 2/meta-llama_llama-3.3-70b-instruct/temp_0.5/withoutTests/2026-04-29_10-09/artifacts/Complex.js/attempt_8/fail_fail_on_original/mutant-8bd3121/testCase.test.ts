import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when calculating acsch with undefined b', () => {
    const complex = new Complex(1, 2);
    const originalB = complex["im"];
    complex["im"] = undefined;
    expect(() => complex.acsch()).toThrow();
    complex["im"] = originalB;
  });
});