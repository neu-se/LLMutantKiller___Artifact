import { Complex } from './complex.js';

describe('Complex Number Parser', () => {
  it('should correctly parse complex numbers with plus and minus signs', () => {
    const complexNumber1 = new Complex('2+3i');
    expect(complexNumber1.re).toBe(2);
    expect(complexNumber1.im).toBe(3);

    const complexNumber2 = new Complex('4-5i');
    expect(complexNumber2.re).toBe(4);
    expect(complexNumber2.im).toBe(-5);

    const complexNumber3 = new Complex('6+0i');
    expect(complexNumber3.re).toBe(6);
    expect(complexNumber3.im).toBe(0);

    const complexNumber4 = new Complex('0-7i');
    expect(complexNumber4.re).toBe(0);
    expect(complexNumber4.im).toBe(-7);
  });
});