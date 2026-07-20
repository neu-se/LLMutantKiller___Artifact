import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate acsch for a complex number', () => {
    const c = new Complex(1, 2);
    const result = c.acsch();
    const d = c.re * c.re + c.im * c.im;
    expect(d).toBeCloseTo(5, 10);
    const expectedReal = result.re;
    const expectedImaginary = result.im;
    expect(expectedReal).not.toBeNull();
    expect(expectedImaginary).not.toBeNull();
    expect(result.re).toBeCloseTo(0.4811945734682642, 10);
    expect(result.im).toBeCloseTo(-0.89681021452633, 10);
  });
});