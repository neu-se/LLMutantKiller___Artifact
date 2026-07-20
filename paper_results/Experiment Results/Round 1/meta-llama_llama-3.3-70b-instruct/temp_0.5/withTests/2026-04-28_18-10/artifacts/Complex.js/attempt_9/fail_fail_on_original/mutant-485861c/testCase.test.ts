import { Complex } from './complex.js';

describe('Complex', () => {
  it('should have a property "re" when created with two arguments', () => {
    const complex = new Complex(1, 2);
    expect(complex).toHaveProperty('re');
    expect(complex.re).toBe(1);
  });
});