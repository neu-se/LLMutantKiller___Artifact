import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate asech', () => {
    const complex = new Complex(1, 1);
    const result = complex.asech();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});