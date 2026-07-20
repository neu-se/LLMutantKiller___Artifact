import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should have a Complex property that references itself', () => {
    const complex = new Complex(1, 2);
    expect(Complex['Complex']).toBe(Complex);
  });
});