import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate asech for complex numbers', () => {
    const complex = new Complex(0.9, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0.10536051565782628, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});