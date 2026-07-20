import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for acoth with positive b', () => {
    const complex = new Complex(0, 1);
    const result = complex.acoth();
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });

  it('should return the correct result for acoth with negative b', () => {
    const complex = new Complex(0, -1);
    const result = complex.acoth();
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});