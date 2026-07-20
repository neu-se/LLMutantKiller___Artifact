import { Complex } from './complex';

describe('Complex number parsing', () => {
  it('should correctly parse complex numbers with different signs', () => {
    const complexNumber1 = new Complex('1+2i');
    const complexNumber2 = new Complex('1-2i');
    expect(complexNumber1.re).toBe(1);
    expect(complexNumber1.im).toBe(2);
    expect(complexNumber2.re).toBe(1);
    expect(complexNumber2.im).toBe(-2);
    const complexNumber3 = new Complex('2-3i');
    expect(complexNumber3.re).toBe(2);
    expect(complexNumber3.im).toBe(-3);
    const complexNumber4 = new Complex('2-2i');
    expect(complexNumber4.re).toBe(2);
    expect(complexNumber4.im).toBe(-2);
    const complexNumber5 = new Complex('2+2i');
    expect(complexNumber5.re).toBe(2);
    expect(complexNumber5.im).toBe(2);
  });
});