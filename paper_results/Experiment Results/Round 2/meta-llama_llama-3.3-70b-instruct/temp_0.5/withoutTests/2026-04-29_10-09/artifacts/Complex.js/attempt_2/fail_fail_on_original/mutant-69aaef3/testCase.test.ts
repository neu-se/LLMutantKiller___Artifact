import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate hypot', () => {
    const a = 3;
    const b = 4;
    const hypotResult = Math.sqrt(a * a + b * b);
    expect(hypotResult).toBeCloseTo(5);
    const complex = new Complex(a, b);
    expect(complex.abs()).toBeCloseTo(hypotResult);
  });
});