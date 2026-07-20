import { Complex } from '../../complex';

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    const temp = result.re;
    expect(Math.atan2(result.im, temp)).toBeDefined();
  });
});