import { Complex } from '../../complex';

describe('Complex', () => {
  it('should calculate sec correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.sec();
    expect(result.re).toBeCloseTo(1, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});