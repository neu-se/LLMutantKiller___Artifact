import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);

    // Test case to detect the mutation
    const complexNumberMutated = new Complex('1+2');
    expect(complexNumberMutated.im).toBe(0);
  });
});