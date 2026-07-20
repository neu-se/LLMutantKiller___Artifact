import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const c = new Complex(3000, 3000);
    expect(c.abs()).toBeCloseTo(Math.sqrt(3000 * 3000 + 3000 * 3000), 1e-15);
    const d = new Complex(3000, 3001);
    expect(d.abs()).toBeCloseTo(Math.sqrt(3000 * 3000 + 3001 * 3001), 1e-15);
  });
});