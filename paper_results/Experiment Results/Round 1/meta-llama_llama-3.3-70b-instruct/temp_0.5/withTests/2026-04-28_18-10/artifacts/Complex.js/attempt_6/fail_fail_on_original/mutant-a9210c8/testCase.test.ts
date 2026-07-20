import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate csch for a complex number', () => {
    const complex = new Complex(1, 2);
    expect(complex.im).toBe(2);
    const csch = complex.csch();
    expect(csch.re).not.toBeNaN();
    expect(csch.im).not.toBeNaN();
    expect(complex.im).toBe(2);
  });
});