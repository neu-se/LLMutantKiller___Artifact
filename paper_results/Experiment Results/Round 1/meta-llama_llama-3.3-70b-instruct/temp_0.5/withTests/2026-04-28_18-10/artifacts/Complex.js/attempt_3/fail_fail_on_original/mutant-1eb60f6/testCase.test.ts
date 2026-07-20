import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate acsc for non-zero input', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0.46364760900080615, 4);
    expect(result.im).toBeCloseTo(-0.5205008792933656, 4);
  });
});