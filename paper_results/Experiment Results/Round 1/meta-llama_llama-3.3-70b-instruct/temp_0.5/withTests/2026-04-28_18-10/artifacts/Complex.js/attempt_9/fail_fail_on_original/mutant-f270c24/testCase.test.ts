import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate acsch correctly for b === 0', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI / 2);
  });
});