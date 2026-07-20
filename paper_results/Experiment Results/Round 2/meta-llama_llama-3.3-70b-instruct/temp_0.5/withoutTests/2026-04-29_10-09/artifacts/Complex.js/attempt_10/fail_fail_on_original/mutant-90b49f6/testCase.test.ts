import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers from strings and fail on mutation', () => {
    const complexNumber = new Complex('1-2i');
    expect(complexNumber.re).toBeCloseTo(1);
    expect(complexNumber.im).toBeCloseTo(-2);
    const complexNumber2 = new Complex('2-1i');
    expect(complexNumber2.re).toBeCloseTo(2);
    expect(complexNumber2.im).toBeCloseTo(-1);
  });
});