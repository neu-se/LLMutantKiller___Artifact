import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate acosh for complex numbers', () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(0.9045568943062487);
    const d = new Complex(2, 0);
    const result2 = d.acosh();
    expect(result2.re).toBeCloseTo(1.3169578969248166);
    expect(result2.im).toBeCloseTo(0);
  });
});