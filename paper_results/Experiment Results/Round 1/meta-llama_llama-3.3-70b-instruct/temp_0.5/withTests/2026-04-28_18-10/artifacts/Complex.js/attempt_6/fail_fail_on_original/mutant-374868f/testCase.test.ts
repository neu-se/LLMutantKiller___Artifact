import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate asech correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    const expected = 1.3169578969248166;
    expect(result.re).toBeCloseTo(expected, 10);
  });
});