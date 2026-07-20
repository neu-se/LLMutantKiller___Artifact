import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate the magnitude of a complex number correctly', () => {
    const complexNumber = new Complex(3, 4);
    const magnitude = complexNumber.abs();
    expect(magnitude).toBeCloseTo(5);
    const hypotResult = Math.hypot(complexNumber.re, complexNumber.im);
    expect(hypotResult).toBeCloseTo(5);
    const manualCalculation = Math.sqrt(Math.pow(complexNumber.re, 2) + Math.pow(complexNumber.im, 2));
    expect(magnitude).toBeCloseTo(manualCalculation);
  });
});