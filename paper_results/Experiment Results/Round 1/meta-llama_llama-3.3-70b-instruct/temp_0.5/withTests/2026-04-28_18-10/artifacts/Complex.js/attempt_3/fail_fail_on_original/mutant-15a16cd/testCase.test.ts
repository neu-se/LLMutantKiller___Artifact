import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly calculate the ceiling of a complex number', () => {
    const complex = new Complex(1.2, 3.4);
    expect(() => complex.ceil('a')).toThrow();
  });
});