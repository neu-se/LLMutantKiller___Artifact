import { Complex } from './complex';

describe('Complex Number Parser', () => {
  it('should correctly parse complex numbers with plus and minus signs', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);

    const complexNumber2 = new Complex('1-2i');
    expect(complexNumber2.re).toBe(1);
    expect(complexNumber2.im).toBe(-2);

    const complexNumber3 = new Complex('3+2i');
    expect(complexNumber3.re).toBe(3);
    expect(complexNumber3.im).toBe(2);
  });
});