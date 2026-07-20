import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should have a property "re" after calling asinh', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result).toHaveProperty('re');
  });
});