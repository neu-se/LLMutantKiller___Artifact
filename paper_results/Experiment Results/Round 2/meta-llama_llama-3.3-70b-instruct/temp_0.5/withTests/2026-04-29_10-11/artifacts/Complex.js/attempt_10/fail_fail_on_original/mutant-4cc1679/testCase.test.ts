import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex('2+0i');
    const result = complex.acosh();
    expect(result).toBeTruthy();
    expect(result.re).toBeTruthy();
    expect(result.im).toBeTruthy();
  });
});