import { Complex } from './complex';

describe('Complex', () => {
  it('should have a property "re" after calling asinh', () => {
    const complex = new Complex(1, 2);
    complex.asinh();
    expect(complex).toHaveProperty('re');
  });
});