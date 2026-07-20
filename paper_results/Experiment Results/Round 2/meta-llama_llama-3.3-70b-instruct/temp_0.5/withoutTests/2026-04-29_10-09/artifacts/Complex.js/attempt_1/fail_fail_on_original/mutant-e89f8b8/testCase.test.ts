import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate the complex cosecans correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(-0.03033769069806142);
    expect(result.im).toBeCloseTo(-0.03333333333333333);
  });
});