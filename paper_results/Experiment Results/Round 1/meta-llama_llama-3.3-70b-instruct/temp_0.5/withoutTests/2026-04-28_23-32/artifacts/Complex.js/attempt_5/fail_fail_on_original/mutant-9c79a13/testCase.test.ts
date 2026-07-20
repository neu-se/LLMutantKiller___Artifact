import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(0.2650424892704821);
    expect(result.im).toBeCloseTo(-0.2422687863498686);
  });
});