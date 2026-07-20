import { Complex } from './complex.js';

describe('Complex class', () => {
  it('should correctly parse complex numbers from objects', () => {
    const complex = new Complex({ re: 1, im: 2 });
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);

    const complex2 = new Complex({ re: 1, im: 2 });
    expect(complex2.re).toBe(1);
    expect(complex2.im).toBe(2);

    const complex3 = new Complex({ re: 1 });
    expect(complex3.re).toBe(1);
    expect(complex3.im).toBe(0);
  });
});