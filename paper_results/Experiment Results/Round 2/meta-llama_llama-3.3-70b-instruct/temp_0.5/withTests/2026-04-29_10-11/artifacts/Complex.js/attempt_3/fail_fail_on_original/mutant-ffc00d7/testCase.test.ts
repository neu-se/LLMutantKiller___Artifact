import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complex = new Complex('1+1i');
    expect(complex.re).toBeCloseTo(1);
    expect(complex.im).toBeCloseTo(1);
  });
});