import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly parse a complex number from a string', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    const complexInvalid = new Complex('1+Stryker was here!i');
    expect(complexInvalid.im).toBeNaN();
  });
});