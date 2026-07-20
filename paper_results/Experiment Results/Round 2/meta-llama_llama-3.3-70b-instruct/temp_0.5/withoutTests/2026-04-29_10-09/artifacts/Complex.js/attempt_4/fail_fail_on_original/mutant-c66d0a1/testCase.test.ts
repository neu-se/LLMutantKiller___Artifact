import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when calculating the complex acsc for a specific input', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsc()).toThrow();
  });
});