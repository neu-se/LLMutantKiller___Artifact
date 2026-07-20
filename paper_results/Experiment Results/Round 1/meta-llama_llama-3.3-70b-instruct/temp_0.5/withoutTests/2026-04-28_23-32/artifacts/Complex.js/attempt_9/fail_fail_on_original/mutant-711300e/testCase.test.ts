import { Complex } from './complex.js';

describe('Complex class', () => {
  it('should correctly parse complex numbers from objects', () => {
    const complex = new Complex({ re: 1, im: 2 });
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);

    const complex2 = new Complex({ re: 1 });
    expect(complex2.re).toBe(1);
    expect(complex2.im).toBe(0);

    expect(new Complex({ im: 1 }).re).not.toBe(0);
  });
});