import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate the hypot function correctly', () => {
    const complexNumber = new Complex(3, 4);
    const magnitude = complexNumber.abs();
    expect(magnitude).toBeCloseTo(5);
    const hypotResult = Math.hypot(complexNumber.re, complexNumber.im);
    expect(hypotResult).toBeCloseTo(5);
  });
});