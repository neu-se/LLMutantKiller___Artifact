import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should return the correct acsch value', () => {
    const complex = new Complex(1, 2);
    const acschOriginal = new Complex(-0.48121182505960347, -0.8964760208795108);
    const acsch = complex.acsch();
    expect(acsch.re).toBeCloseTo(acschOriginal.re);
    expect(acsch.im).toBeCloseTo(acschOriginal.im);
  });
});