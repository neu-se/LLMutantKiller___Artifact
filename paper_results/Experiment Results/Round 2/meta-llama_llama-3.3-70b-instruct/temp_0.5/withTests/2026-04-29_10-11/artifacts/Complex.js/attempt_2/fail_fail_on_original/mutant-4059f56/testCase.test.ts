import { Complex } from './complex.js';

describe('Complex', () => {
  it('should clone a complex number correctly', () => {
    const complex = new Complex(1, 2);
    const cloned = complex.clone();
    expect(cloned.re).toBe(1);
    expect(cloned.im).toBe(2);
    expect(cloned.toString()).toBe('1 + 2i');
  });
});