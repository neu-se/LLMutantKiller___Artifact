import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly handle objects with both real and imaginary parts', () => {
    const complex1 = new Complex({ re: 1, im: 2 });
    expect(complex1.re).toBe(1);
    expect(complex1.im).toBe(2);
    expect(() => new Complex({ re: 1, im: undefined })).toThrow();
    expect(() => new Complex({ re: undefined, im: 2 })).toThrow();
  });
});