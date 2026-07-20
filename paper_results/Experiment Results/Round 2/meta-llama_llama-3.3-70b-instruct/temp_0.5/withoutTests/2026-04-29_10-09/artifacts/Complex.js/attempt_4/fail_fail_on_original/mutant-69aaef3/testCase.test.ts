import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate hypot', () => {
    const complex = new Complex(3, 4);
    expect(complex.abs()).toBeCloseTo(5);
  });
});