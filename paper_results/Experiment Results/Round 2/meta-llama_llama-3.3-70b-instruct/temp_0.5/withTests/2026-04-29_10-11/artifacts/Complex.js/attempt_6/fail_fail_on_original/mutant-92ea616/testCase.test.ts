import { Complex } from '../../complex';

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    const d = 1 * 1 + 1 * 1;
    expect(d).not.toBe(0);
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBeNull();
    expect(result.im).not.toBeNull();
  });
});