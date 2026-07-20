import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex(2, -1);
    const result = complex.acosh();
    expect(result.im).toBeLessThan(0);
  });
});