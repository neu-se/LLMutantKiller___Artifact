import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate acsc for a complex number', () => {
    const complex = new Complex(2, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(-0.1917548613831508, 10);
    expect(result.im).toBeCloseTo(-0.476837158203125, 10);
  });
});