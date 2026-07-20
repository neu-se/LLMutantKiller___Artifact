import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate the hypot correctly', () => {
    const c = new Complex(3, 4);
    const result = c.abs();
    expect(result).toBeCloseTo(5);
  });
});