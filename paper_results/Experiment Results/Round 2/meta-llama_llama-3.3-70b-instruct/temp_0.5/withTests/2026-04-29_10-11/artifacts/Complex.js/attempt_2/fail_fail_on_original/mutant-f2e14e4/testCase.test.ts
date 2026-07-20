import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate acot for a complex number', () => {
    const z = new Complex(1, 1);
    const resultOriginal = new Complex(1, -1).acot();
    const resultMutated = z.acot();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re);
  });
});