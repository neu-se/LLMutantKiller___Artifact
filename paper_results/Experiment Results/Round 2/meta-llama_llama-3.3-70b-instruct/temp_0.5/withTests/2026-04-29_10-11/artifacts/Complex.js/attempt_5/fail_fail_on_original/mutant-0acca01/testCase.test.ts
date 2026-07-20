import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    const expected = new Complex(0.5493061443340548, -0.46364760900080615);
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});