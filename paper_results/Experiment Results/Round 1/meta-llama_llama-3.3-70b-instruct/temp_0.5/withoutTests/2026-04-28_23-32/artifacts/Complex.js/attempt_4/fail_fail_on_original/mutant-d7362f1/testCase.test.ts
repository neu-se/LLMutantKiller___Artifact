import { Complex } from './complex';

describe('Complex', () => {
  it('should multiply two complex numbers correctly', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBe(3);
    expect(result.im).toBe(6);
  });
});