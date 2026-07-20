import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when calculating acsch with undefined property', () => {
    const complex = new Complex(1, 2);
    expect(complex[""].im).toBeUndefined();
  });
});