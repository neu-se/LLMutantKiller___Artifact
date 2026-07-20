import { Complex } from './complex';

describe('Complex', () => {
  it('should not throw an error when calculating the complex asinh', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result).toBeDefined();
  });
});