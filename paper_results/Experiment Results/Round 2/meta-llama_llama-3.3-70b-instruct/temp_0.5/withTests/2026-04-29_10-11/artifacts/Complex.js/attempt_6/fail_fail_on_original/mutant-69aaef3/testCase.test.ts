import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate the hypot correctly', () => {
    const result = Complex.hypot(3, 0);
    expect(result).toBeCloseTo(3);
  });
});