import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly parse a complex number from a string and throw an error for invalid input', () => {
    const complex1 = new Complex('1+2i');
    expect(complex1.re).toBe(1);
    expect(complex1.im).toBe(2);

    const complex2 = new Complex('a');
    expect(complex2.re).toBeNaN();
    expect(complex2.im).toBeNaN();
  });
});