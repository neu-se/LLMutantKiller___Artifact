import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number string and handle the case where plus and minus are both zero', () => {
    const complex = new Complex('i');
    expect(complex.re).toBeCloseTo(0);
    expect(complex.im).toBeCloseTo(1);
  });
});