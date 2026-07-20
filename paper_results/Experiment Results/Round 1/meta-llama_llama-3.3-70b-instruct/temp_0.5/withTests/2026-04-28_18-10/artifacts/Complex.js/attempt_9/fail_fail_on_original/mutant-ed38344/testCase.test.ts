import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should return Infinity when subtracting an infinite complex number from a finite complex number', () => {
    const c1 = new Complex('1+2i');
    const c2 = new Complex('Infinity');
    const result = c2.sub(c1);
    expect(result.isInfinite()).toBe(true);
  });
});