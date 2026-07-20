import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1);
    const coshValue = complex.cosh().re;
    const expected = (Math.exp(1) + Math.exp(-1)) / 2;
    expect(Math.abs(coshValue - expected)).toBeLessThan(1e-10);
  });
});