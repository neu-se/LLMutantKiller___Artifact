import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate the complex sech correctly for a specific input', () => {
    const complex = new Complex(0, 0);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});