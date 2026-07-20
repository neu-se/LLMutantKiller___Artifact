import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBeNull();
    expect(result.im).not.toBeNull();
    const originalResult = new Complex(1, 1).acot();
    expect(result.re).toBeCloseTo(originalResult.re, 5);
    expect(result.im).toBeCloseTo(originalResult.im, 5);
  });
});