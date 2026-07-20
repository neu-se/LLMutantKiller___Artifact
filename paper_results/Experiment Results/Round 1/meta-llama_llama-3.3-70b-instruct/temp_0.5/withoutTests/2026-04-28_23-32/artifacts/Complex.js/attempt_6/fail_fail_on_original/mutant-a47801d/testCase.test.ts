import { Complex } from '../../complex';

describe('Complex', () => {
  it('should return the correct value for atan when a is 0 and b is 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result.im).not.toBe(0);
  });
});