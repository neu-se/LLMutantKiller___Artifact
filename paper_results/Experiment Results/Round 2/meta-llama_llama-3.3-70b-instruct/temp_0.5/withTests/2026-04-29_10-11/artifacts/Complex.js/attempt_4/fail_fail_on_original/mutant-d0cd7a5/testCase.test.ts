import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct acsch value', () => {
    const complex = new Complex(1, 2);
    const acsch = complex.acsch();
    const original = new Complex(-0.48121182505960347, -0.8964760208795108);
    expect(acsch.re).toBeCloseTo(original.re);
    expect(acsch.im).toBeCloseTo(original.im);
  });
});