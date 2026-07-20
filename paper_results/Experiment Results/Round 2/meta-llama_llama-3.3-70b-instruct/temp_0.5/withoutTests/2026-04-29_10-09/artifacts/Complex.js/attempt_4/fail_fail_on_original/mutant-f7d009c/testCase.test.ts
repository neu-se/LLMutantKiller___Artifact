import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = new Complex(3000, 3000);
    expect(complex.abs()).toBeCloseTo(Math.sqrt(3000*3000 + 3000*3000), 1e-15);
    const complex2 = new Complex(3000, 3001);
    expect(complex2.abs()).toBeCloseTo(Math.sqrt(3000*3000 + 3001*3001), 1e-15);
  });
});