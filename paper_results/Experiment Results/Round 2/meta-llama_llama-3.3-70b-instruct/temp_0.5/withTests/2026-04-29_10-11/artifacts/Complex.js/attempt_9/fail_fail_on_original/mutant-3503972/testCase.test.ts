import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate the complex acsch correctly', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(1, -1);
    expect(c1.acsch().im).not.toEqual(c2.acsch().im);
  });
});