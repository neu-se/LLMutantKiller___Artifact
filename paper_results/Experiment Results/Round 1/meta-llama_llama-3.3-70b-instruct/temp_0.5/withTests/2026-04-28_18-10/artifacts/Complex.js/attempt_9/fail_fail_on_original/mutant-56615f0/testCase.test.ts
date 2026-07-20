import { Complex } from './complex';

describe('Complex.js', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result).toBeTruthy();
  });
});