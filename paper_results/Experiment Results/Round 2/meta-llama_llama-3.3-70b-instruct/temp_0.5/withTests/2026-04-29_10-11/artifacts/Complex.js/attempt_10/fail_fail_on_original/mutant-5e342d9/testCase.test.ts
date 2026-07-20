import { hypot } from '../complex';

describe('Complex.js', () => {
  it('should correctly calculate the hypot function', () => {
    const result1 = hypot(3, 4);
    const result2 = hypot(4, 3);
    expect(result1).toBeCloseTo(result2);
    expect(result1).toBeCloseTo(5);
  });
});