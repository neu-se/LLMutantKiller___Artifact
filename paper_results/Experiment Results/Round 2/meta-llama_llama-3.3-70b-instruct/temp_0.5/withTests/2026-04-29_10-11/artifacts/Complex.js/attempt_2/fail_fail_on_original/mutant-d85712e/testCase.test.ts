import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    const complex2 = new Complex('1+Stryker was here!i');
    expect(complex2.im).toBeNaN();
  });
});