import { Complex } from '../../complex';

describe('Complex', () => {
  it('should correctly calculate acot for a complex number', () => {
    const z = new Complex(1, 1);
    const result = z.acot();
    expect(result.re).not.toBeCloseTo(result.im);
  });
});