import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate acsc for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(-0.46364760900080615, 10);
    expect(result.im).toBeCloseTo(-0.46364760900080615, 10);
  });
});