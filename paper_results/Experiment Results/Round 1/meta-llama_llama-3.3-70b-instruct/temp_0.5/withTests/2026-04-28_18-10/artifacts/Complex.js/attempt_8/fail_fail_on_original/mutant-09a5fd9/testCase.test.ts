import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate the complex sech correctly for a specific case', () => {
    const complex = new Complex(0, 0);
    const sech = complex.sech();
    expect(sech.re).toBeCloseTo(1);
    expect(sech.im).toBeCloseTo(0);
  });
});