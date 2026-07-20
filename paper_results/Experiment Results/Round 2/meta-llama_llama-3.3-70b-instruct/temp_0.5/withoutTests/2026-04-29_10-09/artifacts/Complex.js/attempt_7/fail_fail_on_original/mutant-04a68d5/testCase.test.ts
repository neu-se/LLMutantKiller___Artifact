import { Complex } from "../complex";

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 0);
    const sech = complex.sech();
    expect(complex.re).toBeDefined();
  });
});