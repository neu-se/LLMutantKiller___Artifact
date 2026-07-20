import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acsch for a !== 0 and b === 0', () => {
    const complex = new Complex(1, 0);
    expect(complex.acsch().re).not.toBeNaN();
    expect(complex.acsch().im).toBe(-Infinity);
  });
});