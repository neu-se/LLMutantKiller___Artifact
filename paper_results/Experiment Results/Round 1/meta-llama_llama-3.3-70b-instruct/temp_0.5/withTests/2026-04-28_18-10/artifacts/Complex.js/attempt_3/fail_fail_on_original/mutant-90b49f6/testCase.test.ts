import { Complex } from './complex.js';

describe('Complex Number Parser', () => {
  it('should correctly parse complex numbers with plus and minus signs', () => {
    const complexNumber = new Complex('1+2i-1');
    expect(complexNumber.re).toBeNaN();
  });
});