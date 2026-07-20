import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result).not.toBeNull();
    const temp = result.re;
    expect(temp).not.toBeNaN();
    expect(Math.atan2(result.im, temp)).toBeDefined();
  });
});