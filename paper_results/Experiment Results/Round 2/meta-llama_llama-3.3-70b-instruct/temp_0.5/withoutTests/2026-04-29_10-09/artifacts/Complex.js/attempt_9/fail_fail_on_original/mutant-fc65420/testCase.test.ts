import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate acsch correctly for non-zero real part', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Math.log(1 + Math.sqrt(2)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it('should calculate acsch correctly for a = 0', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });

  it('should throw an error for a = 0 in mutated code', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsch();
    expect(result.re).not.toBeCloseTo(Infinity, 10);
  });
});