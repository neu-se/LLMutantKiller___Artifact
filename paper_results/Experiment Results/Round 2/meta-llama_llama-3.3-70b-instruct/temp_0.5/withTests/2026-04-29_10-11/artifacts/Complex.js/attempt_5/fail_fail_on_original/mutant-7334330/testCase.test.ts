import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate the division of two complex numbers', () => {
    const c1 = new Complex(2, 3);
    const c2 = new Complex(4, 1);
    const result = c1.div(c2);
    expect(result.re).toBeCloseTo(0.5882352941176471);
    expect(result.im).toBeCloseTo(0.6470588235294118);
  });
});