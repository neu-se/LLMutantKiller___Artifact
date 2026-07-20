import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate the complex asech for a = 0', () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});