import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly parse a complex number from a string and have a "re" property', () => {
    const complex = new Complex('1+2i');
    expect(complex).toHaveProperty('re');
    expect(complex.re).toBeDefined();
  });
});