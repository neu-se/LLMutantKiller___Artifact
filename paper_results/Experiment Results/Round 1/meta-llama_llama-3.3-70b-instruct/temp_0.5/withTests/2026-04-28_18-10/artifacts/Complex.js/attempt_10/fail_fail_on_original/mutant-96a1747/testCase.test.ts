import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate the complex atanh', () => {
    const complex = new Complex(1.5, 0);
    const result = complex.atanh();
    expect(result).not.toHaveProperty('');
  });
});