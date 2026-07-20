import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Math.log(1 + Math.sqrt(2)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it('should throw an error for zero real part in mutated code', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsch()).toThrowError();
  });
});