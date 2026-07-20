import { Complex } from './complex';

describe('Complex', () => {
  it('should clone a complex number correctly', () => {
    const complex = new Complex(1, 2);
    const cloned = complex.clone();
    expect(cloned.re).toBe(complex.re);
    expect(cloned.im).toBe(complex.im);
    expect(cloned.toString()).toBe(complex.toString());
  });
});