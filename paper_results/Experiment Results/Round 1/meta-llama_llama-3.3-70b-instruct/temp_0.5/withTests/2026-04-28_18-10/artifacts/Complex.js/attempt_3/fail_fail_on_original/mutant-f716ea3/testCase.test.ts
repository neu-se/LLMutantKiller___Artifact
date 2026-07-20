import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly handle atanh calculation for a = -1', () => {
    const complex = new Complex(-1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Infinity, 10);
  });

  it('should correctly handle atanh calculation for a = 1', () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });

  it('should correctly handle atanh calculation for a = 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it('should correctly handle atanh calculation for a = 0.5', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it('should correctly handle atanh calculation for a = -2', () => {
    const complex = new Complex(-2, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(-Math.PI/2, 10);
  });
});