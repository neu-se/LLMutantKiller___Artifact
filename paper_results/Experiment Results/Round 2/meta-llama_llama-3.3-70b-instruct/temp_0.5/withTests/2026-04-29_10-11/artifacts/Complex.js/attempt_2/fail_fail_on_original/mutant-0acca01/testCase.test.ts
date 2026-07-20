import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const c = new Complex(2, 1);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(-0.46364760900080615);
  });
});