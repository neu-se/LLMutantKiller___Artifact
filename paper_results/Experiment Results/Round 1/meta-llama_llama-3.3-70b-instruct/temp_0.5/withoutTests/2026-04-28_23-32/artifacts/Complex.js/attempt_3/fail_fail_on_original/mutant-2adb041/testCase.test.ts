import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const complex = new Complex(Math.PI / 4);
    const result = complex.expm1();
    const expected = Math.exp(Math.PI / 4) - 1;
    expect(result.re).toBeCloseTo(expected * Math.cos(Math.PI / 4), 10);
    expect(result.im).toBeCloseTo(expected * Math.sin(Math.PI / 4), 10);
  });
});