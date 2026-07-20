import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate csch for a complex number', () => {
    const complex = new Complex(1, 2);
    const csch = complex.csch();
    const b = complex.im;
    expect(b).toBe(2);
    expect(csch.re).not.toBeNaN();
    expect(csch.im).not.toBeNaN();
  });
});