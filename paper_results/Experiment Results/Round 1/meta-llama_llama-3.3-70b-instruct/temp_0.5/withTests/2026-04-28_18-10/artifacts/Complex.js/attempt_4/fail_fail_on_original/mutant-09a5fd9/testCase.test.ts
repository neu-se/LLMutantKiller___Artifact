import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(0, 0);
    const sech = complex.sech();
    expect(sech.re).toBeCloseTo(1);
    expect(sech.im).toBeCloseTo(0);
  });
});